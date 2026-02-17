import { NextResponse } from "next/server"

// Gemini-powered portfolio assistant.
// IMPORTANT: The model never manipulates the DOM directly.
// It can only request actions via the tool schema below.

const TOOL_DEFS = [
  {
    name: "scrollPage",
    description: "Scrolls the page up or down by a given amount.",
    parameters: {
      type: "object",
      properties: {
        direction: { type: "string", enum: ["up", "down"] },
        amount: {
          type: "string",
          description: "How far to scroll. Suggested: 'viewport', 'half', or a pixel string like '400px'.",
        },
      },
      required: ["direction"],
    },
  },
  {
    name: "navigateToSection",
    description: "Smooth-scrolls to a page section (by id or best match).",
    parameters: {
      type: "object",
      properties: {
        sectionId: { type: "string", description: "Preferred: exact section id like 'projects'" },
        sectionName: { type: "string", description: "Fallback: human name like 'projects' or 'contact'" },
      },
    },
  },
  {
    name: "highlightElement",
    description: "Highlights an element on the page using a CSS selector.",
    parameters: {
      type: "object",
      properties: {
        selector: { type: "string", description: "CSS selector for the element to highlight" },
      },
      required: ["selector"],
    },
  },
  {
    name: "clickElement",
    description: "Clicks a button/link on the page using a CSS selector.",
    parameters: {
      type: "object",
      properties: {
        selector: { type: "string" },
      },
      required: ["selector"],
    },
  },
  {
    name: "fillInput",
    description: "Fills an input/textarea value using a CSS selector.",
    parameters: {
      type: "object",
      properties: {
        selector: { type: "string" },
        value: { type: "string" },
      },
      required: ["selector", "value"],
    },
  },
]

const SYSTEM_INSTRUCTIONS = `You are a helpful AI website assistant for a developer portfolio.

Goals:
- Answer questions about the portfolio using the provided WEBSITE_CONTEXT (projects, skills, experience, etc.).
- If the user requests a page action (scroll, navigate, highlight, click, fill form), respond with exactly one tool call.
- Do NOT output JavaScript or instructions to modify the DOM directly.

Tool-use policy:
- Use tool calls only when an action is needed.
- When choosing selectors, prefer stable ids and data-ai attributes from context.
- If the request is ambiguous, ask a short clarifying question instead of guessing.
`

function truncateText(text, maxLen) {
  if (!text) return ""
  const str = String(text)
  if (str.length <= maxLen) return str
  return str.slice(0, maxLen) + "…"
}

function normalizeHistory(history) {
  if (!Array.isArray(history)) return []
  // We only accept a minimal format to avoid prompt injection via arbitrary structures.
  return history
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-12)
}

function buildUserPrompt({ message, context, history }) {
  const safeHistory = normalizeHistory(history)

  const historyBlock = safeHistory
    .map((m) => `${m.role.toUpperCase()}: ${truncateText(m.content, 800)}`)
    .join("\n")

  const ctx = context && typeof context === "object" ? context : {}

  return [
    `WEBSITE_CONTEXT (dynamic snapshot; treat as source of truth):\n${truncateText(JSON.stringify(ctx), 14000)}`,
    historyBlock ? `\nCONVERSATION_HISTORY:\n${truncateText(historyBlock, 8000)}` : "",
    `\nUSER_MESSAGE:\n${truncateText(message, 4000)}`,
  ]
    .filter(Boolean)
    .join("\n")
}

function extractToolCallFromResponse(response) {
  // @google/generative-ai response structure can include functionCall parts.
  const candidate = response?.candidates?.[0]
  const parts = candidate?.content?.parts || []

  for (const part of parts) {
    if (part?.functionCall?.name) {
      return {
        tool: part.functionCall.name,
        args: part.functionCall.args || {},
      }
    }
  }

  return null
}

function extractTextFromResponse(result) {
  try {
    return result?.response?.text?.() || ""
  } catch {
    return ""
  }
}

function pickModelCandidates() {
  const preferred = process.env.GEMINI_MODEL
  // Keep this list short to reduce extra quota hits.
  const candidates = [
    preferred,
    // Prefer 2.0 flash models first when available.
    "gemini-2.0-flash",
    "gemini-2.0-flash-lite",
    // Fall back to 1.5 family if 2.0 is not available.
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    // Legacy fallback still commonly available on free-tier keys.
    "gemini-pro",
  ].filter(Boolean)

  // De-dupe while preserving order.
  return [...new Set(candidates)]
}

function isRetryableModelError(err) {
  const msg = String(err?.message || err)
  return (
    msg.includes("404") ||
    msg.toLowerCase().includes("not found") ||
    msg.includes("429") ||
    msg.toLowerCase().includes("quota") ||
    msg.toLowerCase().includes("rate")
  )
}

async function listAvailableModels(apiKey) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
  const res = await fetch(url, { method: "GET" })
  if (!res.ok) {
    const txt = await res.text().catch(() => "")
    throw new Error(`ListModels failed (${res.status}): ${txt || res.statusText}`)
  }
  const json = await res.json()
  return Array.isArray(json?.models) ? json.models : []
}

function extractSupportedModelNames(models) {
  return (models || [])
    .filter((m) => Array.isArray(m?.supportedGenerationMethods) && m.supportedGenerationMethods.includes("generateContent"))
    .map((m) => String(m?.name || "").replace(/^models\//, ""))
    .filter(Boolean)
}

async function generateWithFallback({ systemInstruction, userText }) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set")

  const { GoogleGenerativeAI } = await import("@google/generative-ai")
  const genAI = new GoogleGenerativeAI(apiKey)

  let lastErr = null
  for (const modelName of pickModelCandidates()) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction,
        tools: [{ functionDeclarations: TOOL_DEFS }],
      })

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: userText }] }],
      })

      return { result, modelName }
    } catch (e) {
      lastErr = e
      if (isRetryableModelError(e)) continue
      throw e
    }
  }

  // Last resort: discover models available to this API key and try a few.
  try {
    const models = await listAvailableModels(apiKey)
    const discovered = extractSupportedModelNames(models)
    for (const modelName of discovered.slice(0, 6)) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction,
          tools: [{ functionDeclarations: TOOL_DEFS }],
        })

        const result = await model.generateContent({
          contents: [{ role: "user", parts: [{ text: userText }] }],
        })

        return { result, modelName }
      } catch (e) {
        lastErr = e
        if (isRetryableModelError(e)) continue
      }
    }
  } catch (e) {
    lastErr = lastErr || e
  }

  throw lastErr || new Error("Gemini request failed")
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}))
    const { message, context, history } = body || {}

    if (!message || typeof message !== "string") {
      return NextResponse.json({ reply: "Missing message.", tool: null }, { status: 400 })
    }

    const userText = buildUserPrompt({ message, context, history })

    const { result } = await generateWithFallback({
      systemInstruction: SYSTEM_INSTRUCTIONS,
      userText,
    })

    const tool = extractToolCallFromResponse(result?.response)
    const replyText = truncateText(extractTextFromResponse(result), 4000).trim()

    // If the model used a tool call, keep the reply short (UI can show action confirmation).
    const reply = tool ? (replyText || "Okay — doing that now.") : (replyText || "")

    return NextResponse.json({ reply, tool })
  } catch (e) {
    const msg = String(e?.message || e)
    const lower = msg.toLowerCase()
    const quotaHint = msg.includes("429") || lower.includes("quota") || lower.includes("rate")
    const notFoundHint = msg.includes("404") || lower.includes("not found")

    // Avoid noisy stack traces for expected config/quota issues.
    if (!quotaHint && !notFoundHint) {
      console.error("/api/chat error", e)
    } else {
      console.warn("/api/chat warning", msg)
    }

    return NextResponse.json(
      {
        reply: quotaHint
          ? "I'm temporarily rate-limited by Gemini. Please try again in a minute."
          : notFoundHint
            ? "Your Gemini API key doesn't have access to the configured model. Try setting GEMINI_MODEL to an available model for your key, or remove GEMINI_MODEL to auto-pick."
            : "Sorry - I couldn't process that right now. Please try again.",
        tool: null,
      },
      { status: 200 }
    )
  }
}
