"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Sparkles, ExternalLink } from "lucide-react"
import { useState } from "react"
import emailjs from '@emailjs/browser'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '', fallbackLink: '' })

  // EmailJS configuration
  const EMAILJS_SERVICE_ID = "service_owzmy6e"
  const EMAILJS_TEMPLATE_ID = "template_wxtnrrt"
  const EMAILJS_PUBLIC_KEY = "L7Qaipd7oF256mMsU"

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const createMailtoLink = () => {
    const subject = encodeURIComponent(formData.subject || `Portfolio Contact from ${formData.name}`)
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )
    return `mailto:vinaychauhansdn@gmail.com?subject=${subject}&body=${body}`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus({ type: '', message: '', fallbackLink: '' })

    const mailtoUrl = createMailtoLink()

    try {
      // Initialize EmailJS
      emailjs.init(EMAILJS_PUBLIC_KEY)

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'vinaychauhansdn@gmail.com',
        reply_to: formData.email
      }

      console.log('Sending message via EmailJS...', templateParams)

      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )

      console.log('EmailJS response:', result)

      setStatus({
        type: 'success',
        message: 'Message sent successfully! I will get back to you soon.',
        fallbackLink: ''
      })
      
      setFormData({ name: "", email: "", subject: "", message: "" })
      
    } catch (error) {
      console.warn('EmailJS service returned error, using direct email fallback:', error)
      
      // Open mailto fallback directly
      window.open(mailtoUrl, '_blank')

      setStatus({
        type: 'fallback',
        message: 'Opening your default email app to send directly to vinaychauhansdn@gmail.com. If your email client did not open, click the button below:',
        fallbackLink: mailtoUrl
      })
    } finally {
      setIsLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      content: "vinaychauhansdn@gmail.com",
      link: "mailto:vinaychauhansdn@gmail.com",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Phone",
      content: "+91 8924002754",
      link: "tel:8924002754",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Location",
      content: "U.P, India",
      link: "#",
    },
  ]

  return (
    <section id="contact" className="py-24 bg-slate-950/80 text-white relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]" />
      </div>

      <div className="w-full mx-auto px-[5%] max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-900/90 text-cyan-400 border border-cyan-500/20 backdrop-blur-md mb-4 shadow-inner">
            <Sparkles size={13} className="text-cyan-400 animate-pulse" />
            <span>Get Connected</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight">
            Get In{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Ready to collaborate or discuss an exciting opportunity? Send a message and let's connect.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Contact Info (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-md space-y-4">
              <h3 className="text-2xl font-bold text-white tracking-tight">Let's Talk</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                I'm always open to discussing full-stack roles, freelance opportunities, or technical collaborations. Feel free to reach out directly via email, phone, or the contact form.
              </p>
            </div>

            <div className="space-y-3">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-4 p-4 bg-slate-900/70 border border-slate-800/80 rounded-xl hover:border-cyan-500/40 hover:bg-slate-900 transition-all duration-300 group cursor-pointer"
                >
                  <div className="p-2.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">{info.title}</h4>
                    <p className="text-slate-400 text-xs">{info.content}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <form onSubmit={handleSubmit} className="p-7 rounded-2xl bg-slate-900/80 border border-slate-800/90 backdrop-blur-md space-y-5">
              {/* Status Message */}
              {status.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl flex flex-col space-y-2 text-sm ${
                    status.type === 'success' 
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/80' 
                      : status.type === 'fallback'
                      ? 'bg-blue-950/80 text-cyan-200 border border-cyan-800/80'
                      : 'bg-red-950/80 text-red-300 border border-red-800/80'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {status.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    ) : status.type === 'fallback' ? (
                      <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    )}
                    <span>{status.message}</span>
                  </div>

                  {status.fallbackLink && (
                    <a
                      href={status.fallbackLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 self-start px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold mt-2 shadow-sm transition-all"
                    >
                      <span>Send Directly via Email Client</span>
                      <ExternalLink size={13} />
                    </a>
                  )}
                </motion.div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    data-ai="contact-name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm placeholder:text-slate-500"
                    placeholder="e.g. Alex Smith"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    data-ai="contact-email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm placeholder:text-slate-500"
                    placeholder="alex@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  data-ai="contact-subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm placeholder:text-slate-500"
                  placeholder="Role Opportunity / Project Discussion"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  data-ai="contact-message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  rows={4}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm placeholder:text-slate-500"
                  placeholder="Hi Vinay, I'd like to discuss..."
                />
              </div>

              <motion.button
                type="submit"
                data-ai="contact-submit"
                disabled={isLoading || !formData.name || !formData.email || !formData.subject || !formData.message}
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 px-8 py-3 rounded-xl font-semibold text-sm transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-lg shadow-blue-500/25 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending message...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact