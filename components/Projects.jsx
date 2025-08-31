"use client"

import { motion } from "framer-motion"
import { Github, ExternalLink } from "lucide-react"
import Image from "next/image"

const projects = [
  {
    title: "ElevateAI",
    description:
      "ElevateAI is a full-stack career growth platform offering AI-powered interview prep, resume optimization, and real-time career insights. It delivers role-specific practice, ATS-friendly resumes, and labor market analytics across 50+ industries, boosting candidate success rates.",
    image: "/ElevateAI.png",
    github: "",
    live: "https://elevate-ai-sigma.vercel.app/",
    tech: [" React","Tailwind CSS","Next.js", "Neondb", "Shadcn UI", "Prisma", "Gemini API"],
  },
  {
    title: "BiteZY",
    description:
      "BiteZY is a full-stack fast-food ordering web application designed for seamless navigation and a clean user experience. It features responsive UI components, client-side routing, and reusable React components, ensuring 100% mobile compatibility and improved maintainability.",
    image: "/BiteZY.png",
    github: "#",
    live: "https://bite-zy.vercel.app/",
    tech: ["Html", "Css", "Javascript"],
  },
  {
    title: "SidCup Golf",
    description:
      "Animated Golf Website is a responsive, mobile-first platform featuring smooth animations and interactive UI elements that enhanced accessibility for 1,000+ users. By optimizing navigation, performance, and front-end interactions, it reduced page load time by 30% and improved user engagement.",
    image: "/Golf.png",
    github: "#",
    live: "https://vihan2754.github.io/Golf-Animated-Website/",
    tech: ["Html", "Css", "Javascript"],
  },
  {
    title: "SkySense",
    description:
      "SkySense is a responsive weather app built with React.js and Material UI, providing real-time forecasts for 200,000+ cities via the OpenWeatherMap API. It ensures seamless cross-device performance and efficient state management with React Hooks.",
    image: "/Skysense.png",
    github: "#",
    live: "https://vihan2754.github.io/Golf-Animated-Website/",
    tech: ["Html", "CSS", "Javascript","React","Material UI"],
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-black relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-black to-indigo-900/20 animate-gradient-slow" />
        <div className="absolute top-1/2 left-1/3 w-[800px] h-[800px] bg-purple-700/10 rounded-full blur-[128px] animate-pulse" />
      </div>

      <div className="w-full mx-auto px-[5%] relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-20 relative z-20"
        >
          <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 text-transparent bg-clip-text drop-shadow-lg">
            Featured Projects
          </h2>
          <p className="text-gray-300 text-lg max-w-xl mx-auto drop-shadow-md">
            A selection of my most impactful work, showcasing creativity, technical expertise, and attention to detail.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeInOut" }}
              whileHover={{ y: -15, scale: 1.03, rotateZ: 3 }}
              className="group relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800"
            >
              {/* Project Image */}
              <div className="relative w-full h-60 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
              </div>

              {/* Project Content */}
              <div className="p-6 relative z-10">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4">{project.description}</p>

                {/* Tech Stack */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.15 }}
                  className="flex flex-wrap gap-2 mb-4"
                >
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full text-sm bg-purple-900/40 text-purple-300 border border-purple-700/50"
                    >
                      {tech}
                    </span>
                  ))}
                </motion.div>

                {/* Buttons */}
                <div className="flex gap-4 mt-4">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Github className="w-5 h-5" /> Code
                  </motion.a>
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 px-4 py-2 rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" /> Live
                  </motion.a>
                </div>
              </div>

              {/* Glow & Particles */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-30 transition duration-700" />
              <motion.div
                className="absolute top-0 right-0 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl opacity-0 group-hover:opacity-70"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-0 left-0 w-24 h-24 bg-pink-500/30 rounded-full blur-2xl opacity-0 group-hover:opacity-70"
                animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}