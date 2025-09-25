"use client"

import { motion } from "framer-motion"
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function Hero() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Generate particles only after component mounts on client side
    if (typeof window !== 'undefined') {
      const newParticles = [...Array(50)].map((_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        endY: window.innerHeight + 100,
        duration: Math.random() * 3 + 2,
      }))
      setParticles(newParticles)
    }
  }, [])

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const resumeLink = "https://drive.google.com/file/d/1xeGPFSLijOKc8IujHfp1acFxfWuFzWY0/view?usp=drive_link"

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: particle.x,
              y: particle.y,
            }}
            animate={{
              y: [null, -100, particle.endY],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-[10%] z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-3/5 mx-auto text-center flex flex-col items-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-4"
            >
              Hi, I'm{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Vinay Chauhan
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-300 mb-6"
            >
              Full Stack Developer
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-gray-400 mb-8 max-w-xl mx-auto text-center"
            >
              Aspiring Software Engineer & Web Developer | Skilled in building responsive, modern applications .
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mb-8 justify-center"
            >
              <a
                href={resumeLink}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <span>View Resume</span>
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex justify-center space-x-6"
            >
              <a
                href="https://github.com/Vihan2754"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/vinay-chauhan-a16a4719b/"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:vinaychauhansdn@gmail.com"
                className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
              >
                <Mail size={24} />
              </a>
            </motion.div>
          </motion.div>

          {/* Profile Picture Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-2/5 mt-12 lg:mt-0 flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-blue-400/30"
              />
              <Image
                src="/profile-pic.png"
                alt="Profile Picture"
                width={400}
                height={400}
                className="rounded-full border-4 border-gray-700 shadow-2xl object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-white transition-colors"
      >
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowDown size={24} />
        </motion.div>
      </motion.button>
    </section>
  )
}