"use client"

import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail, FileText, Sparkles } from "lucide-react"
import Image from "next/image"

export default function Hero() {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const resumeLink = "https://drive.google.com/file/d/1lSV4pcU2xgjY5e2sol7uZFD9h-z8FgDq/view?usp=sharing"

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-950 pt-20 pb-16">
      {/* Refined Ambient Glows (Obsidian, Slate & Cyan/Sapphire) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-cyan-600/10 rounded-full blur-[140px]" />
        <div className="absolute -bottom-20 left-1/3 w-[600px] h-[400px] bg-indigo-600/10 rounded-full blur-[160px]" />
        {/* Subtle grid texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25" />
      </div>

      <div className="container mx-auto px-[6%] lg:px-[8%] z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-7/12 text-center flex flex-col items-center"
          >
            {/* Status Pill */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-900/90 text-slate-300 border border-slate-800 shadow-sm backdrop-blur-md mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-slate-300 font-medium">Available for Opportunities</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-3"
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                Vinay Chauhan
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-xl sm:text-2xl font-semibold text-slate-300 mb-4 flex items-center justify-center gap-2"
            >
              Full Stack Developer
            </motion.p>

            {/* Description - Option 1 */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-slate-400 text-base sm:text-lg mb-8 max-w-xl text-center leading-relaxed"
            >
              Aspiring Software Engineer & Full Stack Developer specializing in the MERN stack, Next.js, and Cloud architectures. Experienced in engineering scalable web apps, RESTful APIs, and modern responsive UIs.
            </motion.p>

            {/* Action Button: View Resume */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="flex justify-center w-full mb-8"
            >
              <a
                href={resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-cyan-500/30 hover:scale-105"
              >
                <FileText size={18} className="group-hover:rotate-6 transition-transform" />
                <span>View Resume</span>
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex items-center justify-center space-x-4 w-full"
            >
              <a
                href="https://github.com/Vihan2754"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="p-2.5 rounded-full bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-800 transition-all transform hover:scale-110 shadow-sm"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/vinay-chauhan-a16a4719b/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="p-2.5 rounded-full bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-blue-400 hover:border-blue-500/40 hover:bg-slate-800 transition-all transform hover:scale-110 shadow-sm"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:vinaychauhansdn@gmail.com"
                aria-label="Send Email"
                className="p-2.5 rounded-full bg-slate-900/90 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 hover:bg-slate-800 transition-all transform hover:scale-110 shadow-sm"
              >
                <Mail size={20} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Profile Picture with Halo Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
            className="lg:w-5/12 flex justify-center relative"
          >
            {/* Ambient Backlight */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[320px] sm:w-[400px] h-[320px] sm:h-[400px] bg-gradient-to-tr from-blue-500/20 via-cyan-500/20 to-indigo-500/10 rounded-full blur-3xl opacity-80" />
            </div>

            {/* Glassmorphic Frame */}
            <div className="relative group p-2 rounded-full bg-gradient-to-b from-slate-700/60 via-slate-800/40 to-slate-900/80 border border-slate-700/50 shadow-2xl backdrop-blur-sm">
              
              {/* Inner Circle Image Container */}
              <div className="relative rounded-full overflow-hidden w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[360px] lg:h-[360px] border-2 border-slate-600/40 shadow-inner">
                <Image
                  src="/profile-photo.jpg"
                  alt="Vinay Chauhan - Full Stack Developer"
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 360px"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Floating Mini Badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="absolute -bottom-2 -left-2 sm:bottom-2 sm:-left-4 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-xl backdrop-blur-md flex items-center gap-2 text-xs font-semibold text-white"
              >
                <Sparkles size={14} className="text-cyan-400" />
                <span>Full Stack Dev</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        onClick={scrollToAbout}
        aria-label="Scroll to About section"
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown size={22} />
        </motion.div>
      </motion.button>
    </section>
  )
}
