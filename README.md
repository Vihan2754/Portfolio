# Developer Portfolio with AI Chatbot

This is a Next.js based developer portfolio integrated with an AI powered chatbot using the Gemini API.

---

## 🚀 Features

- Modern Portfolio UI
- AI Powered Chatbot
- Full Stack Architecture
- API Based Interaction
- Server Side AI Integration

---

## 🧠 AI Chatbot Integration

The chatbot runs on a server route:

```
app/api/chat/route.js
```

It securely calls the Gemini API using server side environment variables.

---

## 🔐 Environment Variables

Create a `.env.local` file in your root directory and add:

```
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-2.0-flash
```

⚠ Do NOT prefix `GEMINI_API_KEY` with `NEXT_PUBLIC_`  
This key must remain server-side only.

---

## ▶ Run Locally

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Open in your browser:

```
http://localhost:3000
```

---

## 🌐 Deploy on Vercel

After deployment:

1. Go to your Vercel Dashboard  
2. Open your project  
3. Navigate to:

```
Settings → Environment Variables
```

4. Add:

| Name | Value |
|------|-------|
GEMINI_API_KEY | your_api_key |
GEMINI_MODEL | gemini-2.0-flash |

5. Select:

- Production  
- Preview  
- Development  

6. Click **Save**

---

## ⚠ Important

After adding environment variables on Vercel:

You must **Redeploy** your project  
for the changes to take effect.

---

## 🛠 Tech Stack

- Next.js  
- React.js  
- Node.js  
- Gemini API  
- REST APIs  
- Vercel  

---

## 📌 Note

Environment variables added locally will NOT work on Vercel unless added manually in the project settings.
