"use client"

import { motion } from "framer-motion"
import { Code, Palette, Zap } from "lucide-react"

export default function About() {
  const features = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and efficient code following best practices.",
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Creative Design",
      description: "Crafting beautiful and intuitive user interfaces that enhance user experience.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Fast Performance",
      description: "Optimizing applications for speed and performance across all devices.",
    },
  ]

  return (
    <section id="about" className="py-20 bg-gray-800/50">
      <div className="w-full mx-auto px-[5%]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-blue-400">Me</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Passionate developer with a love for creating innovative solutions
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">My Story</h3>
            <p className="text-gray-300 mb-6">
              I’m a passionate Full Stack Developer specializing in the MERN stack, with a strong foundation in C++ programming and Data Structures & Algorithms. Currently pursuing my B.Tech in Information Technology at MMMUT, I have worked on several full-stack projects that reflect my ability to design and develop scalable, user-friendly applications.
            </p>
            <p className="text-gray-300 mb-6">
              Beyond coding, I’m always exploring new technologies and sharing knowledge with the developer community. I believe in continuous learning, adapting to the latest industry trends, and building solutions that create real impact.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm">Problem Solver</span>
              <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm">Team Player</span>
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">Quick Learner</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start space-x-4 p-6 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors"
              >
                <div className="text-blue-400 flex-shrink-0">{feature.icon}</div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
