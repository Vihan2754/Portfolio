"use client"

import { motion } from "framer-motion"
import { Calendar, MapPin } from "lucide-react"
import Image from "next/image"

// Create a motion-enabled Image component (motion() deprecated)
const MotionImage = motion.create(Image)

export default function Skills() {
  const skills = [
    { name: "C++", logo: "/c-.png?height=30&width=30" },
    { name: "C", logo: "/letter-c.png?height=30&width=30" },
    { name: "Python", logo: "/python.png?height=30&width=30" },
    { name: "HTML", logo: "/html.png?height=30&width=30" },
    { name: "CSS", logo: "/css-3.png?height=30&width=30" },
    { name: "JavaScript", logo: "/js.png?height=30&width=30" },
    { name: "React.js", logo: "/react.png?height=30&width=30" },
    { name: "Express", logo: "/express.png?height=30&width=30" },
    { name: "Node.js", logo: "/nodejs.png?height=30&width=30" },
    { name: "Tailwind CSS", logo: "/tailwind.png?height=30&width=30" },
    { name: "Next.js", logo: "/nextjs.png?height=30&width=30" },
    { name: "MongoDB", logo: "/database-file.png?height=30&width=30" },
    { name: "Api", logo: "/api.png?height=30&width=30" },
    { name: "Git", logo: "/git.png?height=30&width=30" },
  ]

  const experiences = [
    {
      title: "Frontend Developer",
      company: "Algoflow AI",
      period: "Nov 2025 - Jan 2026",
      location: "Remote",
      description: "Developed scalable frontend interfaces with React and Next.js, styled with Tailwind CSS, and connected to RESTful APIs built with Node.js and Express. Focused on reusable components, performance optimization, and clean, maintainable code.",
    },
    {
      title: "Full Stack Developer",
      company: "iTUX",
      period: "June 2025 - Sep 2025",
      location: "Remote",
      description: "Worked on end-to-end development of modern, scalable web applications, creating dynamic frontends with React, Next.js, and Tailwind CSS and connecting them to robust backend systems using Node.js, Express, and MongoDB.",
    },
  ]

  return (
    <section id="skills" className="py-20">
      <div className="w-full mx-auto px-[5%]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Skills & <span className="text-blue-400">Experience</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">My technical expertise and professional journey</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Skills */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-8">Technical Skills</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {skills.map((skill, index) => (
                <div key={skill.name} className="flex items-center justify-center">
                  {skill.logo && (
                    <MotionImage
                      src={skill.logo || "/placeholder.svg"}
                      alt={`${skill.name} logo`}
                      width={48}
                      height={48}
                      className="w-12 h-12 object-contain rounded-lg" // Added rounded-lg here
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.1, filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.7))" }} // Added glow effect
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Experience */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-8">Work Experience</h3>
            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative pl-8 border-l-2 border-blue-400"
                >
                  <div className="absolute w-4 h-4 bg-blue-400 rounded-full -left-2 top-0" />
                  <div className="bg-gray-800/50 p-6 rounded-lg">
                    <h4 className="text-xl font-semibold mb-2">{exp.title}</h4>
                    <p className="text-blue-400 font-medium mb-2">{exp.company}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4 text-gray-400 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        {exp.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        {exp.location}
                      </div>
                    </div>
                    <p className="text-gray-300">{exp.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
