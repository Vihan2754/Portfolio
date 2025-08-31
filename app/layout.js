import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Vinay Chauhan - Portfolio",
  description:
    "Full Stack Developer Portfolio - Modern web applications with React, Next.js, and cutting-edge technologies",
  keywords: "Full Stack Developer, React, Next.js, JavaScript, Web Development, Portfolio",
  authors: [{ name: "Vinay Chauhan" }],
  creator: "Vinay Chauhan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://vinaychauhan.dev",
    title: "Vinay Chauhan - Full Stack Developer",
    description:
      "Full Stack Developer Portfolio - Modern web applications with React, Next.js, and cutting-edge technologies",
    siteName: "Vinay Chauhan Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vinay Chauhan - Full Stack Developer",
    description:
      "Full Stack Developer Portfolio - Modern web applications with React, Next.js, and cutting-edge technologies",
    creator: "@vinaychauhan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/tittle.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#111827" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
}