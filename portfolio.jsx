import React, { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'


import { Github, Linkedin, Mail, ArrowRight, Code2, Zap, Terminal, Cpu, Database, Layers } from 'lucide-react'

export default function Portfolio() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const projects = [
    {
      title: 'AI-Powered Database manager ',
      desc: 'A full-stack MERN app that uses AI to generate database queries ,  automate task scheduling, and provide productivity insights.',
      tech: 'React, Node.js, MongoDB, TailwindCSS, OpenAI API',
      link: '#',
      icon: Cpu
    },
    {
      title: '3D Portfolio Website',
      desc: 'A fully interactive 3D portfolio using React Three Fiber and Framer Motion, showcasing stunning UI animations and transitions.',
      tech: 'React Three Fiber, Framer Motion, TailwindCSS',
      link: '#',
      icon: Layers
    },
    {
      title: 'Realtime Chat App',
      desc: 'A live chat app supporting private chats, group messages, and emoji reactions with Socket.io and JWT authentication.',
      tech: 'React, Node.js, Express, Socket.io, MongoDB',
      link: '#',
      icon: Terminal
    },
    {
      title: 'E-Commerce Admin Dashboard',
      desc: 'A dynamic admin dashboard for tracking sales, managing inventory, and analyzing revenue trends through beautiful charts.',
      tech: 'React, Redux, Node.js, MongoDB, Chart.js',
      link: '#',
      icon: Database
    }
  ]

  const arcPaths = [
    { d: "M 20 50 Q 50 20, 80 50", delay: 0 },
    { d: "M 30 60 Q 50 35, 70 60", delay: 0.3 },
    { d: "M 25 55 Q 50 25, 75 55", delay: 0.6 }
  ]

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center py-20 px-6 overflow-hidden relative">
      {/* Animated Grid Background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            maskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 50%, black, transparent)'
          }}
        />
      </div>

      {/* Neon Orb with Electricity Effect */}
      <motion.div
        className="fixed top-1/4 right-1/4 w-96 h-96 pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="absolute inset-0 bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full blur-3xl" />
        
        {/* Electric Arcs */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          {arcPaths.map((arc, i) => (
            <motion.path
              key={i}
              d={arc.d}
              stroke="url(#electric-gradient)"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: arc.delay,
                ease: "easeInOut"
              }}
            />
          ))}
          <defs>
            <linearGradient id="electric-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Connection Lines Network Effect */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none opacity-30" style={{ zIndex: 0 }}>
        <motion.line
          x1="10%" y1="20%" x2="90%" y2="30%"
          stroke="url(#line-gradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
        <motion.line
          x1="20%" y1="60%" x2="80%" y2="70%"
          stroke="url(#line-gradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 1 }}
        />
        <motion.line
          x1="30%" y1="40%" x2="70%" y2="80%"
          stroke="url(#line-gradient)"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }}
        />
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
            <stop offset="50%" stopColor="#06b6d4" stopOpacity="1" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Hero Section */}
      <motion.div 
        className="text-center max-w-5xl relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Profile Image with Neon Glow */}
        <motion.div
          className="relative inline-block mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 15,
            duration: 1
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'linear-gradient(45deg, #06b6d4, #3b82f6, #8b5cf6, #06b6d4)',
              backgroundSize: '300% 300%',
              filter: 'blur(20px)',
              transform: 'scale(1.1)'
            }}
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.img 
            src="/mnt/data/WhatsApp Image 2025-08-24 at 11.18.23_5c89bbb5.jpg" 
            alt="Anurag Sharma" 
            className="w-44 h-44 object-cover rounded-full relative z-10 border-2 border-cyan-400/50"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          
          {/* Orbiting Particles */}
          {[0, 120, 240].map((angle, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
              style={{
                top: '50%',
                left: '50%',
              }}
              animate={{
                x: [
                  Math.cos((angle * Math.PI) / 180) * 100,
                  Math.cos(((angle + 360) * Math.PI) / 180) * 100
                ],
                y: [
                  Math.sin((angle * Math.PI) / 180) * 100,
                  Math.sin(((angle + 360) * Math.PI) / 180) * 100
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
                delay: i * 0.2
              }}
            />
          ))}
        </motion.div>

        {/* Name with Electric Text Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="text-7xl md:text-8xl font-bold mb-4 relative">
            <span className="relative inline-block">
              <span 
                className="absolute inset-0 blur-xl opacity-50"
                style={{
                  background: 'linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Anurag Sharma
              </span>
              <motion.span 
                className="relative"
                style={{
                  background: 'linear-gradient(90deg, #06b6d4, #3b82f6, #8b5cf6, #06b6d4)',
                  backgroundSize: '200% 100%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
              >
                Anurag Sharma
              </motion.span>
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-3 text-lg text-cyan-400/80 mb-6"
        >
          <Code2 className="w-5 h-5" />
          <span className="font-light tracking-wider">Full Stack Developer</span>
          <Zap className="w-5 h-5" />
        </motion.div>

        {/* Tech Stack */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-3 mb-8"
        >
          {['React', 'Node.js', 'MongoDB', 'TailwindCSS', 'Framer Motion'].map((tech, i) => (
            <motion.span
              key={tech}
              className="px-4 py-2 rounded-full text-sm font-light border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              whileHover={{ 
                borderColor: 'rgba(6, 182, 212, 0.6)',
                backgroundColor: 'rgba(6, 182, 212, 0.1)',
                scale: 1.05
              }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-gray-400 text-base max-w-2xl mx-auto leading-relaxed font-light mb-10"
        >
          Passionate Full Stack Developer crafting modern, interactive, and high-performance web applications. 
          Focused on creating immersive digital experiences with elegant design and robust functionality.
        </motion.p>

        {/* Social Links */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex justify-center gap-6 mb-10"
        >
          {[
            { icon: Github, href: 'https://github.com/Anuragsharma15-dell' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/anurag-sharma-22b518330' },
            { icon: Mail, href: 'mailto:anurag863@gmail.com' }
          ].map(({ icon: Icon, href }, i) => (
            <motion.a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group"
              whileHover={{ scale: 1.2, y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="absolute inset-0 bg-cyan-500 rounded-full blur-xl opacity-0 group-hover:opacity-60"
                transition={{ duration: 0.3 }}
              />
              <div className="relative p-3 rounded-full border border-cyan-500/30 bg-cyan-500/5 backdrop-blur-sm group-hover:border-cyan-500/60 transition-colors">
                <Icon className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.a
          href="mailto:anurag863@gmail.com"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          <motion.button
            className="relative px-8 py-4 rounded-full text-base font-medium overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ backgroundSize: '200% 100%' }}
            />
            <span className="relative z-10 flex items-center gap-2">
              Get In Touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </motion.button>
        </motion.a>
      </motion.div>

      {/* About Section */}
      <motion.div 
        className="max-w-3xl mt-32 relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative p-12 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 backdrop-blur-xl">
          <motion.div
            className="absolute inset-0 rounded-3xl opacity-20"
            animate={{
              background: [
                'radial-gradient(circle at 0% 0%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
                'radial-gradient(circle at 0% 0%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)'
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          
          <h2 className="text-4xl font-bold mb-6 text-center bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-gray-300 text-base leading-relaxed font-light mb-4">
            I am a dedicated Computer Science student at <span className="text-cyan-400 font-normal">Sagar Institute of Research and Technology (SIRT)</span>, currently in my <span className="text-blue-400 font-normal">second year, third semester</span>. From <span className="text-cyan-400 font-normal">Bhopal, Madhya Pradesh</span>, I have a strong passion for building <span className="text-blue-400 font-normal">real-world web applications</span> that stand out through elegant UI design and robust functionality.
          </p>
          <p className="text-gray-300 text-base leading-relaxed font-light">
            My goal is to continuously learn and create impactful projects that merge creativity with technology, enhancing user experience while solving practical problems.
          </p>
        </div>
      </motion.div>

      {/* Projects Section */}
      <motion.div 
        className="grid md:grid-cols-2 gap-8 mt-32 max-w-6xl relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        {projects.map((proj, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ y: -8 }}
          >
            <div className="relative h-full p-8 rounded-2xl border border-cyan-500/20 bg-linear-to-br from-cyan-500/5 to-transparent backdrop-blur-sm group overflow-hidden">
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.15) 0%, transparent 50%)'
                }}
                transition={{ duration: 0.3 }}
              />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                    <proj.icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-cyan-400 group-hover:text-blue-400 transition-colors">
                    {proj.title}
                  </h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4 font-light">
                  {proj.desc}
                </p>
                <p className="text-xs text-gray-500 mb-6 font-light">
                  {proj.tech}
                </p>
                <a href={proj.link} target="_blank" rel="noopener noreferrer">
                  <motion.button
                    className="flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-cyan-500/30 text-cyan-400 hover:border-cyan-500/60 hover:bg-cyan-500/10 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Project
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Contact Section */}
      <motion.div 
        className="text-center mt-32 max-w-xl relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative p-12 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 backdrop-blur-xl">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Let's Work Together
          </h2>
          <p className="text-gray-400 mb-8 text-base font-light leading-relaxed">
            Have an idea or project in mind? I'd love to help bring it to life with clean code and creative design.
          </p>
          <motion.a
            href="mailto:anurag863@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="relative px-8 py-4 rounded-full text-base font-medium overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ backgroundSize: '200% 100%' }}
              />
              <span className="relative z-10 flex items-center gap-2">
                Send Message
                <Mail className="w-4 h-4" />
              </span>
            </button>
          </motion.a>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer 
        className="mt-32 text-center text-gray-600 text-sm pb-8 relative z-10 font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <p>© {new Date().getFullYear()} Anurag Sharma. Crafted with passion using React & Framer Motion.</p>
      </motion.footer>
    </div>
  )
}
