"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react"
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
  const [status, setStatus] = useState({ type: '', message: '' })

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus({ type: '', message: '' })

    try {
      // Initialize EmailJS with your public key
      emailjs.init(EMAILJS_PUBLIC_KEY)

      // Prepare template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_email: 'vinaychauhansdn@gmail.com',
        reply_to: formData.email
      }

      console.log('Sending email with EmailJS...', templateParams)

      // Send email using EmailJS
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )

      console.log('Email sent successfully:', result)
      
      // Show success message
      setStatus({
        type: 'success',
        message: 'Message sent successfully! I\'ll get back to you soon.'
      })
      
      // Reset form
      setFormData({ name: "", email: "", subject: "", message: "" })
      
    } catch (error) {
      console.error('Failed to send email:', error)
      
      let errorMessage = 'Failed to send message. Please try again or contact me directly.'
      
      // Provide more specific error messages
      if (error.text) {
        errorMessage = `Error: ${error.text}`
      } else if (error.message) {
        if (error.message.includes('Public-Key')) {
          errorMessage = 'Invalid EmailJS configuration. Please check the public key.'
        } else if (error.message.includes('Service')) {
          errorMessage = 'Invalid EmailJS service ID. Please check the configuration.'
        } else if (error.message.includes('Template')) {
          errorMessage = 'Invalid EmailJS template ID. Please check the configuration.'
        } else {
          errorMessage = error.message
        }
      }
      
      // Show error message
      setStatus({
        type: 'error',
        message: errorMessage
      })
    } finally {
      setIsLoading(false)
      
      // Clear status message after 5 seconds
      setTimeout(() => {
        setStatus({ type: '', message: '' })
      }, 5000)
    }
  }

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      content: "vinaychauhansdn@gmail.com",
      link: "mailto:vinaychauhansdn@gmail.com",
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      content: "+91 8924002754",
      link: "tel:8924002754",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      content: "U.P, India",
      link: "#",
    },
  ]

  return (
    <section id="contact" className="py-16 bg-gray-800/50 text-white">
      <div className="w-full mx-auto px-[5%]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="text-blue-400">Touch</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ready to start your next project? Let's work together to create something amazing.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-6">Let's Talk</h3>
            <p className="text-gray-300 mb-6">
              I'm always interested in hearing about new projects and opportunities. Whether you're a company looking to
              hire, or you're a fellow developer wanting to collaborate, I'd love to hear from you.
            </p>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-4 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors group cursor-pointer"
                >
                  <div className="text-blue-400 group-hover:scale-110 transition-transform">{info.icon}</div>
                  <div>
                    <h4 className="font-semibold">{info.title}</h4>
                    <p className="text-gray-400">{info.content}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              {/* Status Message */}
              {status.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg flex items-center space-x-2 ${
                    status.type === 'success' 
                      ? 'bg-green-900/50 text-green-300 border border-green-700' 
                      : 'bg-red-900/50 text-red-300 border border-red-700'
                  }`}
                >
                  {status.type === 'success' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <AlertCircle className="w-5 h-5" />
                  )}
                  <span>{status.message}</span>
                </motion.div>
              )}

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-white"
                  placeholder="Project Discussion"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  rows={5}
                  className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed text-white"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading || !formData.name || !formData.email || !formData.subject || !formData.message}
                whileHover={!isLoading ? { scale: 1.05 } : {}}
                whileTap={!isLoading ? { scale: 0.95 } : {}}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact