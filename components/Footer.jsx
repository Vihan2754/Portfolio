"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Twitter, Heart } from "lucide-react"

export default function Footer() {
  const socialLinks = [
    { icon: <Github size={20} />, href: "https://github.com/Vihan2754", label: "GitHub" }, // Updated GitHub link
    { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/vinay-chauhan-a16a4719b/", label: "LinkedIn" },
    // { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
    { icon: <Mail size={20} />, href: "mailto:vinaychauhansdn@gmail.com", label: "Email" },
  ]

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ]

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.replace("#", ""))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="w-full mx-auto px-[5%] py-12">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-3">
              Vinay Chauhan
            </h3>
            <p className="text-gray-400 mb-4">
              Full Stack Developer passionate about creating exceptional digital experiences with modern technologies
              and clean code.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-white transition-colors p-2 bg-gray-800 rounded-full hover:bg-gray-700"
                  aria-label={link.label}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-white transition-colors hover:translate-x-1 transform duration-200"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-2 text-gray-400">
              <p>U.P, India</p>
              <p>vinaychauhansdn@gmail.com</p>
              <p>+91 8924002754</p>
            </div>
            {/* <div className="mt-4">
              <p className="text-sm text-gray-500">Available for freelance opportunities</p>
            </div> */}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-9 pt-6 text-center"
        >
          <p className="text-gray-400 flex items-center justify-center space-x-1">
            <span>© {new Date().getFullYear()} All rights are reserved</span>
            {/* <Heart className="text-red-500 fill-current" size={16} />
            <span>using React, Next.js & Tailwind CSS</span> */}
          </p>
        </motion.div>
      </div>
    </footer>
  )
}