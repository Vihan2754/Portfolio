"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { MessageCircle, X, Send } from "lucide-react"

function safeQuerySelector(selector) {
  try {
    return document.querySelector(selector)
  } catch {
    return null
  }
}

function dispatchInputEvents(el) {
  try {
    el.dispatchEvent(new Event("input", { bubbles: true }))
    el.dispatchEvent(new Event("change", { bubbles: true }))
  } catch {
    // ignore
  }
}

function getSectionTitle(sectionEl) {
  if (!sectionEl) return ""
  const heading = sectionEl.querySelector("h1, h2, h3")
  return (heading?.innerText || sectionEl.getAttribute("aria-label") || "").trim()
}

function snippet(text, maxLen) {
  const str = String(text || "").replace(/\s+/g, " ").trim()
  if (!str) return ""
  if (str.length <= maxLen) return str
  return str.slice(0, maxLen) + "…"
}

function collectPageContext() {
  if (typeof document === "undefined") return {}

  const sections = Array.from(document.querySelectorAll("section[id]"))
    .map((section) => {
      const id = section.id
      const title = getSectionTitle(section)
      const text = snippet(section.innerText, 900)
      return { id, title, text }
    })
    .filter((s) => s.id)

  const interactive = Array.from(document.querySelectorAll("a, button, input, textarea, select"))
    .slice(0, 80)
    .map((el) => {
      const tag = el.tagName.toLowerCase()
      const id = el.id || null
      const name = el.getAttribute("name") || null
      const type = el.getAttribute("type") || null
      const href = tag === "a" ? el.getAttribute("href") : null
      const text = snippet(el.innerText || el.getAttribute("aria-label") || el.getAttribute("placeholder") || "", 120)
      const dataAi = el.getAttribute("data-ai") || null
      const dataAiIndex = el.getAttribute("data-ai-index") || null

      // Offer a stable selector if possible.
      let selector = null
      if (id) selector = `#${CSS.escape(id)}`
      else if (dataAi && dataAiIndex) selector = `[data-ai="${dataAi}"][data-ai-index="${dataAiIndex}"]`
      else if (dataAi) selector = `[data-ai="${dataAi}"]`

      return { tag, id, name, type, href, text, dataAi, dataAiIndex, selector }
    })

  const projectsSection = document.getElementById("projects")
  const projects = projectsSection
    ? Array.from(projectsSection.querySelectorAll('[data-ai="project-card"]')).map((card) => {
        const index = card.getAttribute("data-ai-index")
        const titleEl = card.querySelector('[data-ai="project-title"]') || card.querySelector("h3")
        const descEl = card.querySelector("p")
        return {
          index,
          title: snippet(titleEl?.innerText || "", 120),
          description: snippet(descEl?.innerText || "", 220),
          cardSelector: index != null ? `[data-ai="project-card"][data-ai-index="${index}"]` : null,
          liveSelector: index != null ? `[data-ai="project-live"][data-ai-index="${index}"]` : null,
          githubSelector: index != null ? `[data-ai="project-github"][data-ai-index="${index}"]` : null,
        }
      })
    : []

  const forms = Array.from(document.querySelectorAll("form"))
    .slice(0, 5)
    .map((form) => ({
      action: form.getAttribute("action") || null,
      id: form.id || null,
      name: form.getAttribute("name") || null,
    }))

  return {
    url: typeof window !== "undefined" ? window.location.href : "",
    sections,
    projects,
    interactive,
    forms,
  }
}

function scrollPage({ direction, amount }) {
  const dir = direction === "up" ? -1 : 1

  let delta = window.innerHeight * 0.85
  if (typeof amount === "string") {
    const a = amount.toLowerCase().trim()
    if (a === "half") delta = window.innerHeight * 0.45
    else if (a === "viewport") delta = window.innerHeight * 0.85
    else if (a.endsWith("px")) {
      const n = Number.parseFloat(a.replace("px", ""))
      if (Number.isFinite(n)) delta = n
    }
  }

  window.scrollBy({ top: dir * delta, behavior: "smooth" })
  return `Scrolled ${direction}.`
}

function navigateToSection({ sectionId, sectionName }) {
  const targetId = String(sectionId || sectionName || "").trim()
  if (!targetId) return "Which section should I open?"

  const direct = document.getElementById(targetId)
  if (direct) {
    direct.scrollIntoView({ behavior: "smooth", block: "start" })
    return `Navigated to ${targetId}.`
  }

  // Fuzzy match by section title
  const sections = Array.from(document.querySelectorAll("section[id]"))
  const lowered = targetId.toLowerCase()
  const match = sections.find((s) => (getSectionTitle(s) || "").toLowerCase().includes(lowered))
  if (match) {
    match.scrollIntoView({ behavior: "smooth", block: "start" })
    return `Navigated to ${match.id}.`
  }

  return `I couldn't find a section named '${targetId}'.`
}

function highlightElement({ selector }) {
  const el = safeQuerySelector(selector)
  if (!el) return `Couldn't find element for selector: ${selector}`

  el.scrollIntoView({ behavior: "smooth", block: "center" })
  el.classList.add("ai-highlight")
  window.setTimeout(() => el.classList.remove("ai-highlight"), 1800)

  return "Highlighted."
}

function clickElement({ selector }) {
  const el = safeQuerySelector(selector)
  if (!el) return `Couldn't find element for selector: ${selector}`

  el.scrollIntoView({ behavior: "smooth", block: "center" })
  try {
    el.focus?.()
  } catch {
    // ignore
  }
  el.click()
  return "Clicked."
}

function fillInput({ selector, value }) {
  const el = safeQuerySelector(selector)
  if (!el) return `Couldn't find input for selector: ${selector}`

  el.scrollIntoView({ behavior: "smooth", block: "center" })

  const tag = el.tagName.toLowerCase()
  if (tag !== "input" && tag !== "textarea" && tag !== "select") {
    return `That selector doesn't point to an input: ${selector}`
  }

  el.value = String(value ?? "")
  dispatchInputEvents(el)
  return "Filled."
}

const TOOL_EXECUTORS = {
  scrollPage,
  navigateToSection,
  highlightElement,
  clickElement,
  fillInput,
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [busy, setBusy] = useState(false)
  const [messages, setMessages] = useState(() => [
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! Ask me anything about this portfolio — or tell me to scroll, navigate, highlight, click, or fill the contact form.",
    },
  ])

  const listRef = useRef(null)
  const typingTimerRef = useRef(null)

  const historyForApi = useMemo(() => {
    // Convert local UI messages to API history (user/assistant only).
    return messages
      .filter((m) => m.role === "user" || m.role === "assistant")
      .slice(-10)
      .map((m) => ({ role: m.role, content: m.content }))
  }, [messages])

  useEffect(() => {
    if (!open) return
    // scroll to bottom when opened
    window.setTimeout(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })
    }, 0)
  }, [open])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) window.clearInterval(typingTimerRef.current)
    }
  }, [])

  function addAssistantMessageWithTyping(fullText) {
    const text = String(fullText || "")
    if (!text.trim()) return

    const id = `a_${Date.now()}_${Math.random().toString(16).slice(2)}`
    setMessages((prev) => [...prev, { id, role: "assistant", content: "" }])

    if (typingTimerRef.current) window.clearInterval(typingTimerRef.current)

    let i = 0
    const step = 3
    typingTimerRef.current = window.setInterval(() => {
      i = Math.min(text.length, i + step)
      const next = text.slice(0, i)

      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, content: next } : m)))

      if (i >= text.length) {
        window.clearInterval(typingTimerRef.current)
        typingTimerRef.current = null
      }
    }, 18)
  }

  async function sendMessage() {
    const text = input.trim()
    if (!text || busy) return

    setMessages((prev) => [
      ...prev,
      { id: `u_${Date.now()}_${Math.random().toString(16).slice(2)}`, role: "user", content: text },
    ])
    setInput("")
    setBusy(true)

    try {
      const context = collectPageContext()

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, context, history: historyForApi }),
      })

      const data = await res.json().catch(() => null)
      const reply = data?.reply
      const tool = data?.tool

      if (reply) {
        addAssistantMessageWithTyping(reply)
      }

      if (tool && tool.tool && TOOL_EXECUTORS[tool.tool]) {
        const result = TOOL_EXECUTORS[tool.tool](tool.args || {})
        // Optional: show a short action confirmation.
        setMessages((prev) => [
          ...prev,
          {
            id: `a_${Date.now()}_${Math.random().toString(16).slice(2)}`,
            role: "assistant",
            content: typeof result === "string" ? result : "Done.",
          },
        ])
      }

      if (tool && tool.tool && !TOOL_EXECUTORS[tool.tool]) {
        setMessages((prev) => [
          ...prev,
          {
            id: `a_${Date.now()}_${Math.random().toString(16).slice(2)}`,
            role: "assistant",
            content: `I can't run the tool '${tool.tool}' in the browser.`,
          },
        ])
      }
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          id: `a_${Date.now()}_${Math.random().toString(16).slice(2)}`,
          role: "assistant",
          content: "Chat error - please try again.",
        },
      ])
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-6 right-6 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {open ? <X className="h-6 w-6 text-white" /> : <MessageCircle className="h-6 w-6 text-white" />}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[92vw] max-w-sm overflow-hidden rounded-2xl border border-gray-700 bg-gray-900/95 text-white shadow-2xl backdrop-blur">
          <div className="flex items-center justify-between border-b border-gray-700 px-4 py-3">
            <div>
              <p className="font-semibold leading-5">Portfolio Assistant</p>
              <p className="text-xs text-gray-400">Ask about projects, skills, experience</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md p-2 hover:bg-gray-800"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div ref={listRef} className="ai-chat-scroll max-h-[420px] overflow-y-auto px-4 py-3">
            <div className="space-y-3">
              {messages.map((m, idx) => (
                <div
                  key={m.id || idx}
                  className={
                    m.role === "user"
                      ? "ml-auto w-fit max-w-[85%] rounded-2xl bg-blue-600 px-3 py-2 text-sm"
                      : "mr-auto w-fit max-w-[85%] rounded-2xl bg-gray-800 px-3 py-2 text-sm"
                  }
                >
                  {m.content}
                </div>
              ))}
              {busy && (
                <div className="mr-auto w-fit max-w-[85%] rounded-2xl bg-gray-800 px-3 py-2 text-sm text-gray-300">
                  Thinking…
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-gray-700 p-3">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage()
                }}
                disabled={busy}
                placeholder="Type a message…"
                className="w-full rounded-xl border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60"
              />
              <button
                type="button"
                onClick={sendMessage}
                disabled={busy || !input.trim()}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
