"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar,
  Briefcase,
  Code2,
  Sparkles,
  Database,
  Globe,
  GitBranch,
  Cpu,
  Cloud,
  Server,
  Workflow,
  ExternalLink,
} from "lucide-react"
import Image from "next/image"

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("All")

  const categories = [
    { id: "All", label: "All Skills", icon: Sparkles },
    { id: "Frontend", label: "Frontend", icon: Globe },
    { id: "Backend & DB", label: "Backend & DB", icon: Database },
    { id: "Languages", label: "Languages", icon: Code2 },
    { id: "Tools", label: "Cloud & Tools", icon: Cloud },
  ]

  const skills = [
    {
      name: "React.js",
      category: "Frontend",
      level: "Advanced",
      logo: "/react.png",
      glowColor: "rgba(97, 218, 251, 0.3)",
      borderColor: "hover:border-cyan-500/50",
    },
    {
      name: "Next.js",
      category: "Frontend",
      level: "Advanced",
      logo: "/nextjs.png",
      glowColor: "rgba(255, 255, 255, 0.25)",
      borderColor: "hover:border-slate-400/50",
    },
    {
      name: "Tailwind CSS",
      category: "Frontend",
      level: "Advanced",
      logo: "/tailwind.png",
      glowColor: "rgba(56, 189, 248, 0.3)",
      borderColor: "hover:border-sky-500/50",
    },
    {
      name: "JavaScript",
      category: "Languages",
      level: "Proficient",
      logo: "/js.png",
      glowColor: "rgba(247, 223, 30, 0.3)",
      borderColor: "hover:border-yellow-500/50",
    },
    {
      name: "Node.js",
      category: "Backend & DB",
      level: "Advanced",
      logo: "/nodejs.png",
      glowColor: "rgba(104, 160, 99, 0.3)",
      borderColor: "hover:border-emerald-500/50",
    },
    {
      name: "Express.js",
      category: "Backend & DB",
      level: "Advanced",
      logo: "/express.png",
      glowColor: "rgba(200, 200, 200, 0.25)",
      borderColor: "hover:border-slate-400/50",
    },
    {
      name: "MongoDB",
      category: "Backend & DB",
      level: "Proficient",
      logo: "/database-file.png",
      glowColor: "rgba(71, 162, 72, 0.3)",
      borderColor: "hover:border-green-500/50",
    },
    {
      name: "REST APIs",
      category: "Backend & DB",
      level: "Advanced",
      logo: "/api.png",
      glowColor: "rgba(239, 68, 68, 0.3)",
      borderColor: "hover:border-red-500/50",
    },
    {
      name: "AWS Cloud",
      category: "Tools",
      level: "Cloud & Hosting",
      logo: "/aws.png",
      glowColor: "rgba(255, 153, 0, 0.35)",
      borderColor: "hover:border-amber-500/50",
    },
    {
      name: "Git & GitHub",
      category: "Tools",
      level: "Version Control",
      logo: "/git.png",
      glowColor: "rgba(240, 80, 50, 0.3)",
      borderColor: "hover:border-orange-500/50",
    },
    {
      name: "C / C++",
      category: "Languages",
      level: "DSA & Core",
      logo: "/c-.png",
      glowColor: "rgba(0, 89, 156, 0.3)",
      borderColor: "hover:border-blue-600/50",
    },
    {
      name: "Python",
      category: "Languages",
      level: "Proficient",
      logo: "/python.png",
      glowColor: "rgba(55, 118, 171, 0.3)",
      borderColor: "hover:border-yellow-400/50",
    },
    {
      name: "HTML5",
      category: "Frontend",
      level: "Advanced",
      logo: "/html.png",
      glowColor: "rgba(227, 79, 38, 0.3)",
      borderColor: "hover:border-orange-500/50",
    },
    {
      name: "CSS3",
      category: "Frontend",
      level: "Advanced",
      logo: "/css-3.png",
      glowColor: "rgba(38, 77, 228, 0.3)",
      borderColor: "hover:border-blue-500/50",
    },
  ]

  const competencies = [
    {
      title: "MERN Stack",
      desc: "MongoDB, Express, React, Node.js",
      icon: Server,
    },
    {
      title: "DSA & Logic",
      desc: "Algorithms & problem solving in C++",
      icon: Code2,
    },
    {
      title: "Cloud & CI/CD",
      desc: "AWS, Vercel, Render deployment",
      icon: Cloud,
    },
  ]

  const experiences = [
    {
      title: "Software Developer Intern",
      company: "Causalfunnel",
      link: "https://www.linkedin.com/company/causalfunnel",
      type: "Internship",
      period: "Feb 2026 - Aug 2026",
      location: "Remote",
      borderAccent: "border-blue-500/40",
      tagColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      description:
        "Worked on MERN stack, Next.js, Python, Firebase, and Shell Scripting. Contributed to frontend/backend development, debugging API and JSON issues, improving app performance, and developing analytics and A/B testing features. Also worked on UI improvements.",
      skills: ["Next.js", "MERN Stack", "Python", "Firebase", "Shell Scripting", "A/B Testing", "REST APIs"],
    },
    {
      title: "Full Stack Developer",
      company: "Algoflow AI",
      link: "https://www.linkedin.com/company/algoflow-ai-pvt-ltd/",
      type: "Internship",
      period: "Nov 2025 - Jan 2026",
      location: "Remote",
      borderAccent: "border-cyan-500/40",
      tagColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
      description:
        "Engineered end-to-end web applications, building dynamic, responsive frontends with React, Next.js, and Tailwind CSS, and connecting them to robust backend systems using Node.js, Express, and MongoDB.",
      skills: ["React.js", "Next.js", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
    },
    {
      title: "Full Stack Developer",
      company: "iTUX",
      link: "https://www.linkedin.com/company/itux/",
      type: "Internship",
      period: "June 2025 - Sep 2025",
      location: "Remote",
      borderAccent: "border-indigo-500/40",
      tagColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
      description:
        "Worked on end-to-end development of modern, scalable web applications, creating dynamic frontends with React, Next.js, and Tailwind CSS and connecting them to robust backend systems using Node.js, Express, and MongoDB.",
      skills: ["React.js", "Next.js", "Tailwind CSS", "Node.js", "Express", "MongoDB"],
    },
  ]

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory)

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-950/60">
      {/* Ambient background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-40 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="w-full mx-auto px-[5%] max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-900/90 text-cyan-400 border border-cyan-500/20 backdrop-blur-md mb-4 shadow-inner">
            <Sparkles size={13} className="text-cyan-400 animate-pulse" />
            <span>Expertise & Track Record</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
            Skills &{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            A comprehensive overview of my technical toolkit, engineering capabilities, and professional journey.
          </p>
        </motion.div>

        {/* Main Grid Layout - Equal Height Matching */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">

          {/* LEFT: Technical Skills (6 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="lg:col-span-6 flex flex-col justify-between h-full space-y-4"
          >
            <div>
              {/* Header */}
              <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800/80 mb-3.5">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">Technical Arsenal</h3>
                  <p className="text-xs text-slate-400">Frameworks, languages & modern tooling</p>
                </div>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5 mb-3.5">
                {categories.map((cat) => {
                  const Icon = cat.icon
                  const isActive = activeCategory === cat.id
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`relative px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${isActive
                          ? "text-white shadow-lg shadow-blue-500/20"
                          : "text-slate-400 hover:text-slate-200 bg-slate-900/60 hover:bg-slate-800/60 border border-slate-800"
                        }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeSkillTab"
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 border border-cyan-400/30"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-1.5">
                        <Icon className="w-3 h-3" />
                        {cat.label}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Skills Cards Grid - 2 columns, 14 perfectly paired items */}
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
              >
                <AnimatePresence mode="popLayout">
                  {filteredSkills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      layout
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.2, delay: index * 0.02 }}
                      whileHover={{
                        y: -2,
                        transition: { duration: 0.2 },
                      }}
                      className={`group relative p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/90 ${skill.borderColor} backdrop-blur-md transition-all duration-300 shadow-sm hover:shadow-md`}
                    >
                      {/* Hover ambient backdrop glow */}
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-lg -z-10"
                        style={{ background: skill.glowColor }}
                      />

                      <div className="flex items-center gap-2.5">
                        {/* Tech Icon Container */}
                        <div className="relative w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg bg-slate-800/90 border border-slate-700/60 p-1.5 group-hover:border-slate-600 transition-all duration-300 group-hover:scale-105 shadow-inner">
                          <Image
                            src={skill.logo}
                            alt={`${skill.name} logo`}
                            width={24}
                            height={24}
                            className="w-5 h-5 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs sm:text-sm font-semibold text-white whitespace-nowrap overflow-hidden text-ellipsis group-hover:text-cyan-300 transition-colors">
                            {skill.name}
                          </h4>
                          <span className="text-[10px] text-slate-400 group-hover:text-slate-300 transition-colors font-medium">
                            {skill.level}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Engineering Focus Card - Aligns baseline perfectly */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950 border border-slate-800/90 backdrop-blur-md space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <Workflow className="w-3.5 h-3.5 text-cyan-400" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Engineering Focus</h4>
                </div>
                <span className="text-[10px] font-semibold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                  Full Stack
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-0.5">
                {competencies.map((comp, idx) => {
                  const CompIcon = comp.icon
                  return (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/70 space-y-0.5">
                      <div className="flex items-center gap-1 text-blue-400">
                        <CompIcon className="w-3 h-3 flex-shrink-0" />
                        <span className="text-[11px] font-semibold text-slate-200 truncate">{comp.title}</span>
                      </div>
                      <p className="text-[10px] text-slate-400 leading-tight line-clamp-2">{comp.desc}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Work Experience Timeline (6 cols on lg) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="lg:col-span-6 flex flex-col justify-between h-full space-y-4"
          >
            {/* Header */}
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800/80 mb-3.5">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white tracking-tight">Work Experience</h3>
                <p className="text-xs text-slate-400">Professional internships & engineering roles</p>
              </div>
            </div>

            {/* Timeline Container - Flex 1 for identical vertical stretch */}
            <div className="relative pl-6 sm:pl-7 flex-1 flex flex-col justify-between space-y-3.5 before:absolute before:left-3 sm:before:left-3 before:top-3 before:bottom-3 before:w-[2px] before:bg-gradient-to-b before:from-blue-500 before:via-cyan-500 before:to-indigo-600/30">
              {experiences.map((exp, index) => (
                <motion.div
                  key={exp.company + exp.period}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative group flex-1 flex flex-col"
                >
                  {/* Timeline Node Icon */}
                  <div className="absolute -left-6 sm:-left-7 top-2 flex items-center justify-center">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/30 group-hover:scale-110 group-hover:border-blue-400 transition-all duration-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 group-hover:bg-blue-300 transition-colors" />
                    </div>
                  </div>

                  {/* Experience Card */}
                  <div className={`p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 ${exp.borderAccent} backdrop-blur-md transition-all duration-300 group-hover:bg-slate-900 group-hover:shadow-xl group-hover:shadow-cyan-500/5 group-hover:-translate-y-0.5 flex-1 flex flex-col justify-between`}>
                    <div>
                      {/* Header Row: Title & Company */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {exp.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            {exp.link ? (
                              <a
                                href={exp.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold text-xs transition-all duration-200 group/company hover:underline decoration-cyan-400/50"
                              >
                                <span>{exp.company}</span>
                                <ExternalLink size={11} className="opacity-70 group-hover/company:opacity-100 group-hover/company:translate-x-0.5 transition-transform" />
                              </a>
                            ) : (
                              <span className="text-cyan-400 font-semibold text-xs">
                                {exp.company}
                              </span>
                            )}
                            <span className="text-slate-600">•</span>
                            <span className="text-[11px] text-slate-400 font-medium">
                              {exp.type}
                            </span>
                          </div>
                        </div>

                        {/* Live Remote status pill */}
                        <span className="self-start sm:self-center inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          {exp.location}
                        </span>
                      </div>

                      {/* Date Meta */}
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-2">
                        <Calendar size={12} className="text-cyan-400/80" />
                        <span>{exp.period}</span>
                      </div>

                      {/* Role Description */}
                      <p className="text-slate-300 text-xs leading-relaxed mb-3">
                        {exp.description}
                      </p>
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="pt-2 border-t border-slate-800/80 flex flex-wrap gap-1 mt-auto">
                      {exp.skills.map((tech) => (
                        <span
                          key={tech}
                          className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${exp.tagColor}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
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
