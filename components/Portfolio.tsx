import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useMotionTemplate, useMotionValue, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Mail, ArrowRight, ExternalLink, Code2, Terminal, Cpu, Database, Layout, Globe, Server, Smartphone, Sparkles, MessageSquare, Send, X, Bot, Loader2, PenTool, Copy, Check, Sun, Moon } from 'lucide-react';

// --- API Helper ---
const callGemini = async (prompt, systemInstruction = "") => {
  const apiKey = import.meta.env.VITE_API_KEY;
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] },
        }),
      }
    );
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Something went wrong. Please try again later.";
  }
};

// --- Utility Component: Spotlight Card ---
function SpotlightCard({ children, className = "", isDark = true }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative border overflow-hidden rounded-xl transition-colors duration-300 ${
        isDark
          ? 'border-neutral-800 bg-neutral-900/50'
          : 'border-gray-300 bg-gray-50/50'
      } ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(14, 165, 233, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

// --- Feature 1: AI Project Generator ---
function ProjectGenerator({ isDark = true }) {
  const [selectedTech, setSelectedTech] = useState([]);
  const [idea, setIdea] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleTech = (tech) => {
    setSelectedTech(prev => 
      prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
    );
  };

  const generateIdea = async () => {
    if (selectedTech.length === 0) return;
    setLoading(true);
    const prompt = `Generate a unique, creative, and challenging coding project idea using these technologies: ${selectedTech.join(', ')}. Keep the description concise (max 3 sentences) but exciting. Suggest a cool name for the project.`;
    
    const result = await callGemini(prompt, "You are a creative tech lead suggesting innovative project ideas.");
    setIdea(result);
    setLoading(false);
  };

  const techOptions = ['React', 'Node.js', 'Three.js', 'Python', 'AI/ML', 'Firebase', 'Tailwind'];

  return (
    <div className="mb-32 relative">
      <div className={`absolute inset-0 rounded-3xl blur-3xl transition-colors duration-300 ${
        isDark
          ? 'bg-gradient-to-r from-cyan-500/5 to-purple-500/5'
          : 'bg-gradient-to-r from-cyan-500/10 to-purple-500/10'
      }`} />
      <div className={`relative p-8 md:p-12 rounded-3xl border backdrop-blur-sm transition-colors duration-300 ${
        isDark
          ? 'border-neutral-800 bg-neutral-900/50'
          : 'border-gray-300 bg-white/50'
      }`}>
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="w-6 h-6 text-amber-400" />
          <h2 className={`text-2xl font-bold transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-neutral-900'
          }`}>Spark ✨ Project Generator</h2>
        </div>
        <p className={`mb-8 transition-colors duration-300 ${
          isDark ? 'text-neutral-400' : 'text-neutral-600'
        }`}>
          Stuck on what to build next? Select some tech stacks below and let Gemini AI brainstorm a unique project for you.
        </p>

        <div className="flex flex-wrap gap-3 mb-8">
          {techOptions.map(tech => (
            <button
              key={tech}
              onClick={() => toggleTech(tech)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                selectedTech.includes(tech)
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                  : isDark
                    ? 'bg-neutral-900 border-neutral-700 text-neutral-400 hover:border-neutral-500'
                    : 'bg-gray-100 border-gray-400 text-gray-600 hover:border-gray-500'
              }`}
            >
              {tech}
            </button>
          ))}
        </div>

        <button
          onClick={generateIdea}
          disabled={loading || selectedTech.length === 0}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-semibold hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
          {loading ? 'Dreaming up ideas...' : 'Generate Idea'}
        </button>

        {idea && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-8 p-6 rounded-xl border transition-colors duration-300 ${
              isDark
                ? 'bg-neutral-950 border-neutral-800'
                : 'bg-gray-100 border-gray-300'
            }`}
          >
            <h3 className={`text-sm font-mono mb-2 uppercase tracking-wider transition-colors duration-300 ${
              isDark ? 'text-amber-400' : 'text-amber-600'
            }`}>Generated Concept</h3>
            <p className={`leading-relaxed whitespace-pre-wrap transition-colors duration-300 ${
              isDark ? 'text-neutral-200' : 'text-neutral-700'
            }`}>{idea}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// --- Feature 2: Smart Email Drafter ---
function ContactDrafter({ isDark = true }) {
  const [roughDraft, setRoughDraft] = useState("");
  const [polishedEmail, setPolishedEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const draftEmail = async () => {
    if (!roughDraft) return;
    setLoading(true);
    const systemPrompt = "You are a professional executive assistant. Turn the user's rough input into a polished, professional email inquiry addressed to Anurag Sharma (a Full Stack Developer). Keep it concise, friendly, and business-ready. Subject line included.";
    const result = await callGemini(roughDraft, systemPrompt);
    setPolishedEmail(result);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(polishedEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative rounded-3xl overflow-hidden p-8 md:p-12 mb-32 border transition-colors duration-300 ${
      isDark
        ? 'bg-neutral-900 border-neutral-800'
        : 'bg-white border-gray-300'
    }`}>
      <div className={`absolute top-0 right-0 p-12 rounded-full blur-3xl transition-colors duration-300 ${
        isDark ? 'bg-cyan-500/10' : 'bg-cyan-500/5'
      }`} />
      
      <div className="relative z-10 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className={`text-3xl font-bold mb-4 transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-neutral-900'
          }`}>Magic Contact ✨</h2>
          <p className={`mb-8 transition-colors duration-300 ${
            isDark ? 'text-neutral-400' : 'text-neutral-600'
          }`}>
            Don't know what to say? Just type your messy thoughts below (e.g., "need website for my pizza shop"), and AI will write a professional email for you to send to me.
          </p>
          
          <div className="space-y-4">
            <textarea
              value={roughDraft}
              onChange={(e) => setRoughDraft(e.target.value)}
              placeholder="e.g. Hi I have a startup idea for a pet walking app and need a dev..."
              className={`w-full h-32 rounded-xl p-4 focus:ring-1 focus:outline-none transition-all resize-none ${
                isDark
                  ? 'bg-neutral-950 border border-neutral-800 text-neutral-200 focus:ring-cyan-500'
                  : 'bg-gray-100 border border-gray-300 text-neutral-900 focus:ring-cyan-500'
              }`}
            />
            <button
              onClick={draftEmail}
              disabled={loading || !roughDraft}
              className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-neutral-200 transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <PenTool className="w-4 h-4" />}
              Draft Email
            </button>
          </div>
        </div>

        <div className={`rounded-xl border p-6 flex flex-col transition-colors duration-300 ${
          isDark
            ? 'bg-neutral-950 border-neutral-800'
            : 'bg-gray-100 border-gray-300'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <span className={`text-xs font-mono uppercase tracking-wider transition-colors duration-300 ${
              isDark ? 'text-neutral-500' : 'text-gray-600'
            }`}>Preview</span>
            {polishedEmail && (
              <button 
                onClick={handleCopy}
                className={`transition-colors duration-300 ${
                  isDark
                    ? 'text-neutral-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
          </div>
          
          <div className={`flex-1 text-sm leading-relaxed whitespace-pre-wrap font-mono transition-colors duration-300 ${
            isDark
              ? 'text-neutral-300'
              : 'text-neutral-700'
          }`}>
            {polishedEmail || <span className={`italic transition-colors duration-300 ${
              isDark ? 'text-neutral-600' : 'text-gray-500'
            }`}>// Your polished email will appear here...</span>}
          </div>

          {polishedEmail && (
            <a 
              href={`mailto:anurag863@gmail.com?body=${encodeURIComponent(polishedEmail)}`}
              className={`mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-lg border transition-colors duration-300 ${
                isDark
                  ? 'bg-cyan-600/20 text-cyan-400 border-cyan-600/50 hover:bg-cyan-600/30'
                  : 'bg-cyan-100 text-cyan-700 border-cyan-300 hover:bg-cyan-200'
              }`}
            >
              <Mail className="w-4 h-4" />
              Open in Mail App
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

// --- Feature 3: Floating AI Chat Widget ---
function AIChatWidget({ isDark = true }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hi! I'm Anurag's AI assistant. Ask me anything about his skills, projects, or experience!" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const systemContext = `
      You are an AI assistant for Anurag Sharma's portfolio website. 
      Here is his profile context:
      - Name: Anurag Sharma
      - Role: Full Stack Developer (Student)
      - Education: B.Tech Computer Science at SIRT, Bhopal (2025-Present)
      - Key Skills: React, Node.js, MongoDB, TailwindCSS, Framer Motion, TypeScript, Next.js.
      - Projects: 
        1. AI Database Manager (React, Node, OpenAI)
        2. Immersive 3D Portfolio (R3F, WebGL)
        3. Realtime Chat Platform (Socket.io, Redis)
        4. E-Commerce Analytics (Next.js, Tremor)
      - Contact: anurag863@gmail.com
      - GitHub: Anuragsharma15-dell
      
      Tone: Professional, friendly, and concise. Keep answers short (under 50 words unless asked for detail).
      Goal: Impress recruiters and developers.
    `;

    const responseText = await callGemini(userMsg, systemContext);
    
    setMessages(prev => [...prev, { role: 'assistant', text: responseText }]);
    setIsTyping(false);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-24 right-6 w-80 md:w-96 h-[500px] rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border transition-colors duration-300 ${
              isDark
                ? 'bg-neutral-900 border-neutral-800'
                : 'bg-white border-gray-300'
            }`}
          >
            {/* Chat Header */}
            <div className={`p-4 border-b flex justify-between items-center transition-colors duration-300 ${
              isDark
                ? 'bg-neutral-950 border-neutral-800'
                : 'bg-gray-100 border-gray-300'
            }`}>
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg transition-colors duration-300 ${
                  isDark ? 'bg-cyan-500/10' : 'bg-cyan-100'
                }`}>
                  <Bot className={`w-5 h-5 transition-colors duration-300 ${
                    isDark ? 'text-cyan-400' : 'text-cyan-700'
                  }`} />
                </div>
                <div>
                  <h3 className={`font-semibold text-sm transition-colors duration-300 ${
                    isDark ? 'text-white' : 'text-neutral-900'
                  }`}>Anurag's Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className={`text-xs transition-colors duration-300 ${
                      isDark ? 'text-neutral-400' : 'text-gray-600'
                    }`}>Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className={`p-1 rounded-lg transition-colors duration-300 ${
                  isDark
                    ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                    : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-4 transition-colors duration-300 ${
              isDark ? 'bg-neutral-900' : 'bg-white'
            }`}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div 
                    className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed transition-colors duration-300 ${
                      msg.role === 'user' 
                        ? 'bg-cyan-600 text-white rounded-br-none' 
                        : isDark
                          ? 'bg-neutral-800 text-neutral-200 rounded-bl-none'
                          : 'bg-gray-200 text-neutral-900 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className={`p-3 rounded-2xl rounded-bl-none flex gap-1 transition-colors duration-300 ${
                    isDark ? 'bg-neutral-800' : 'bg-gray-200'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full animate-bounce transition-colors duration-300 ${
                      isDark ? 'bg-neutral-500' : 'bg-gray-500'
                    }`} style={{ animationDelay: '0ms' }} />
                    <span className={`w-1.5 h-1.5 rounded-full animate-bounce transition-colors duration-300 ${
                      isDark ? 'bg-neutral-500' : 'bg-gray-500'
                    }`} style={{ animationDelay: '150ms' }} />
                    <span className={`w-1.5 h-1.5 rounded-full animate-bounce transition-colors duration-300 ${
                      isDark ? 'bg-neutral-500' : 'bg-gray-500'
                    }`} style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSend} className={`p-4 border-t transition-colors duration-300 ${
              isDark
                ? 'bg-neutral-950 border-neutral-800'
                : 'bg-gray-100 border-gray-300'
            }`}>
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about skills, projects..."
                  className={`w-full text-sm rounded-xl pl-4 pr-12 py-3 border focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-opacity-60 ${
                    isDark
                      ? 'bg-neutral-900 text-white border-neutral-800 focus:border-cyan-500'
                      : 'bg-white text-neutral-900 border-gray-400 focus:border-cyan-500'
                  }`}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 top-2 p-1.5 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 disabled:opacity-50 disabled:hover:bg-cyan-500 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-6 right-6 p-4 text-white rounded-full shadow-lg z-50 transition-all duration-300 ${
          isDark
            ? 'bg-cyan-500 shadow-cyan-500/20 hover:bg-cyan-600'
            : 'bg-cyan-600 shadow-cyan-500/30 hover:bg-cyan-700'
        }`}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>
    </>
  );
}

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('all');
  const [isDark, setIsDark] = useState(() => {
    try {
      const stored = localStorage.getItem('theme');
      return stored ? stored === 'dark' : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch {}
  }, [isDark]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projects = [
    {
      title: 'AI Database Manager',
      category: 'Full Stack',
      desc: 'Natural language to SQL converter with automated task scheduling.',
      tech: ['React', 'Node.js', 'OpenAI', 'MongoDB'],
      link: '#',
      icon: Cpu,
      color: 'text-rose-400'
    },
    {
      title: 'Immersive 3D Portfolio',
      category: 'Frontend',
      desc: 'Interactive 3D experience using R3F with high-performance animations.',
      tech: ['R3F', 'WebGL', 'Tailwind', 'Framer'],
      link: '#',
      icon: Layout,
      color: 'text-sky-400'
    },
    {
      title: 'Realtime Chat Platform',
      category: 'Full Stack',
      desc: 'Scalable chat architecture supporting 10k+ concurrent connections.',
      tech: ['Socket.io', 'Redis', 'Express', 'Docker'],
      link: '#',
      icon: Terminal,
      color: 'text-emerald-400'
    },
    {
      title: 'E-Commerce Analytics',
      category: 'Dashboard',
      desc: 'Data visualization dashboard for revenue tracking and inventory.',
      tech: ['Next.js', 'Tremor', 'PostgreSQL', 'Prisma'],
      link: '#',
      icon: Database,
      color: 'text-amber-400'
    }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Anuragsharma15-dell', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/anurag-sharma-22b518330', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:anurag863@gmail.com', label: 'Email' }
  ];

  const techStack = [
    { name: 'React', icon: Globe },
    { name: 'Node.js', icon: Server },
    { name: 'TypeScript', icon: Code2 },
    { name: 'MongoDB', icon: Database },
    { name: 'Native', icon: Smartphone },
    { name: 'Next.js', icon: Layout },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    },
  };

  return (
    <div className={`min-h-screen font-sans relative overflow-x-hidden transition-colors duration-300 ${isDark ? 'bg-neutral-950 text-neutral-200' : 'bg-gray-50 text-neutral-900'}`}>
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 origin-left z-50"
        style={{ scaleX }}
      />

       {/* Dynamic Background */}
       <div className="fixed inset-0 z-0 pointer-events-none">
         <div className={`absolute inset-0 transition-colors duration-300 ${
           isDark 
             ? 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-neutral-950 to-neutral-950'
             : 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-50 via-white to-gray-100'
         }`} />
         <div 
           className={`absolute inset-0 transition-opacity duration-300 ${isDark ? 'opacity-20' : 'opacity-10'}`}
           style={{
             backgroundImage: isDark 
               ? 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)'
               : 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.05) 1px, transparent 0)',
             backgroundSize: '40px 40px'
           }}
         />
         <div 
           className={`absolute w-[500px] h-[500px] rounded-full blur-[100px] transition-all duration-300 ease-out will-change-transform ${
             isDark ? 'bg-cyan-500/10' : 'bg-cyan-500/5'
           }`}
           style={{
             left: mousePosition.x - 250,
             top: mousePosition.y - 250,
           }}
         />
       </div>

       <div className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-32">
         
         {/* Header / Hero */}
         <motion.header 
           variants={containerVariants}
           initial="hidden"
           animate="visible"
           className="flex flex-col md:flex-row gap-12 items-center md:items-start justify-between mb-24"
         >
           <div className="flex-1 text-center md:text-left">
             <motion.div variants={itemVariants} className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm mb-6 transition-colors duration-300 ${
               isDark 
                 ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
                 : 'bg-cyan-50 border-cyan-200 text-cyan-700'
             }`}>
               <span className="relative flex h-2 w-2">
                 <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                   isDark ? 'bg-cyan-400' : 'bg-cyan-600'
                 }`}></span>
                 <span className={`relative inline-flex rounded-full h-2 w-2 ${
                   isDark ? 'bg-cyan-500' : 'bg-cyan-600'
                 }`}></span>
               </span>
               Available for Work
             </motion.div>
             
             <motion.h1 variants={itemVariants} className={`text-5xl md:text-7xl font-bold tracking-tight mb-6 transition-colors duration-300 ${
               isDark ? 'text-white' : 'text-neutral-900'
             }`}>
               <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Anurag Sharma</span>
             </motion.h1>
             
             <motion.p variants={itemVariants} className={`text-xl leading-relaxed max-w-2xl mb-8 transition-colors duration-300 ${
               isDark ? 'text-neutral-400' : 'text-neutral-600'
             }`}>
               Full Stack Developer specializing in building <span className={`font-semibold ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>digital products</span> that are precise, performant, and pleasing to the eye.
             </motion.p>

            <motion.div variants={itemVariants} className="flex gap-4 justify-center md:justify-start items-center">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-lg transition-all duration-300 hover:-translate-y-1 ${isDark ? 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600' : 'bg-gray-100 border border-gray-300 text-neutral-700 hover:text-neutral-900 hover:border-gray-400'}`}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
              <button
                onClick={() => setIsDark(prev => { const next = !prev; try { localStorage.setItem('theme', next ? 'dark' : 'light'); } catch{} return next; })}
                aria-label="Toggle theme"
                className={`p-3 rounded-lg transition-all duration-300 ${isDark ? 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white' : 'bg-gray-100 border border-gray-300 text-neutral-700 hover:text-neutral-900'}`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </motion.div>
           </div>

           <motion.div variants={itemVariants} className="relative group">
             <div className={`absolute -inset-1 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 ${
               isDark 
                 ? 'bg-gradient-to-r from-cyan-500 to-purple-600'
                 : 'bg-gradient-to-r from-cyan-400 to-purple-500'
             }`}></div>
             <div className={`relative w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border transition-colors duration-300 ${
               isDark 
                 ? 'border-neutral-800 bg-neutral-900'
                 : 'border-gray-300 bg-gray-100'
             }`}>
               <img 
                 src="https://raw.githubusercontent.com/Anuragsharma15-dell/Anuragsharma15-dell.github.io/main/profile.jpg"
                 alt="Profile"
                 className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-500"
                 onError={(e) => {
                     e.target.style.display = 'none';
                     e.target.parentNode.classList.add('flex', 'items-center', 'justify-center');
                     e.target.parentNode.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="' + (isDark ? 'text-neutral-700' : 'text-gray-400') + '"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
                 }}
               />
             </div>
           </motion.div>
         </motion.header>
 
        {/* Tech Stack */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <p className={`text-sm font-semibold uppercase tracking-wider mb-6 transition-colors duration-300 ${
            isDark ? 'text-neutral-500' : 'text-gray-600'
          }`}>Technologies</p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {techStack.map((tech) => (
              <div key={tech.name} className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border transition-all duration-300 ${
                isDark 
                  ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                  : 'bg-white border-gray-300 hover:border-gray-400 hover:shadow-md'
              }`}>
                <tech.icon className={`w-6 h-6 transition-colors duration-300 ${
                  isDark ? 'text-neutral-400' : 'text-neutral-600'
                }`} />
                <span className={`text-sm font-medium transition-colors duration-300 ${
                  isDark ? 'text-neutral-300' : 'text-neutral-700'
                }`}>{tech.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Projects Section */}
        <div className="mb-32">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4"
          >
            <div>
              <h2 className={`text-3xl font-bold mb-2 transition-colors duration-300 ${
                isDark ? 'text-white' : 'text-neutral-900'
              }`}>Featured Projects</h2>
              <p className={`transition-colors duration-300 ${
                isDark ? 'text-neutral-400' : 'text-neutral-600'
              }`}>A selection of my recent work.</p>
            </div>
            
            <div className={`flex gap-2 p-1 rounded-lg border transition-colors duration-300 ${
              isDark 
                ? 'bg-neutral-900 border-neutral-800'
                : 'bg-gray-100 border-gray-300'
            }`}>
              {['all', 'web', 'mobile'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                    activeTab === tab 
                      ? isDark
                        ? 'bg-neutral-800 text-white shadow-sm'
                        : 'bg-white text-neutral-900 shadow-sm'
                      : isDark
                        ? 'text-neutral-500 hover:text-neutral-300'
                        : 'text-neutral-600 hover:text-neutral-900'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <SpotlightCard isDark={isDark} className="h-full rounded-2xl p-8 hover:shadow-2xl transition-shadow duration-300">
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-3 rounded-xl border transition-colors duration-300 ${
                      isDark 
                        ? 'bg-neutral-950 border-neutral-800'
                        : 'bg-gray-100 border-gray-300'
                    } ${project.color}`}>
                      <project.icon className="w-6 h-6" />
                    </div>
                    <ArrowRight className={`-rotate-45 transition-all duration-300 group-hover:rotate-0 ${
                      isDark 
                        ? 'text-neutral-600 group-hover:text-white'
                        : 'text-gray-400 group-hover:text-neutral-900'
                    }`} />
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors ${
                    isDark ? 'text-white' : 'text-neutral-900'
                  }`}>
                    {project.title}
                  </h3>
                  <p className={`text-sm leading-relaxed mb-6 transition-colors duration-300 ${
                    isDark ? 'text-neutral-400' : 'text-neutral-600'
                  }`}>
                    {project.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t) => (
                      <span key={t} className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors duration-300 ${
                        isDark
                          ? 'bg-neutral-900 border-neutral-800 text-neutral-400 group-hover:border-neutral-700'
                          : 'bg-gray-100 border-gray-300 text-neutral-600 group-hover:border-gray-400'
                      }`}>
                        {t}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Gemini AI Project Generator Section */}
        <ProjectGenerator isDark={isDark} />

        {/* About Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-16 items-center mb-32"
        >
          <div>
            <h2 className={`text-3xl font-bold mb-6 transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-neutral-900'
            }`}>About Me</h2>
            <div className={`space-y-6 leading-relaxed transition-colors duration-300 ${
              isDark ? 'text-neutral-400' : 'text-neutral-600'
            }`}>
              <p>
                I am a dedicated Computer Science student at <strong className={`transition-colors duration-300 ${
                  isDark ? 'text-neutral-200' : 'text-neutral-900'
                }`}>SIRT, Bhopal</strong>. 
                My journey in tech is defined by a curiosity for how things work under the hood.
              </p>
              <p>
                Unlike the noisy internet, I prefer <strong className={`transition-colors duration-300 ${
                  isDark ? 'text-neutral-200' : 'text-neutral-900'
                }`}>clean code</strong> and <strong className={`transition-colors duration-300 ${
                  isDark ? 'text-neutral-200' : 'text-neutral-900'
                }`}>minimalist design</strong>. 
                When I'm not debugging, I'm exploring new web technologies or optimizing backend performance.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className={`absolute top-0 right-0 -z-10 w-64 h-64 rounded-full blur-[80px] transition-colors duration-300 ${
              isDark ? 'bg-cyan-500/20' : 'bg-cyan-500/10'
            }`} />
            <div className={`space-y-8 border-l pl-8 ml-4 transition-colors duration-300 ${
              isDark ? 'border-neutral-800' : 'border-gray-300'
            }`}>
              <div className="relative">
                <span className={`absolute -left-[37px] top-1 h-4 w-4 rounded-full border-2 transition-colors duration-300 ${
                  isDark 
                    ? 'border-neutral-800 bg-neutral-950'
                    : 'border-gray-300 bg-white'
                }`}></span>
                <span className={`text-sm font-mono mb-1 block transition-colors duration-300 ${
                  isDark ? 'text-cyan-500' : 'text-cyan-600'
                }`}>2023 - Present</span>
                <h4 className={`font-medium transition-colors duration-300 ${
                  isDark ? 'text-white' : 'text-neutral-900'
                }`}>B.Tech Computer Science</h4>
                <p className={`text-sm transition-colors duration-300 ${
                  isDark ? 'text-neutral-500' : 'text-neutral-600'
                }`}>Sagar Institute of Research and Technology</p>
              </div>
              <div className="relative">
                <span className={`absolute -left-[37px] top-1 h-4 w-4 rounded-full border-2 transition-colors duration-300 ${
                  isDark 
                    ? 'border-neutral-800 bg-neutral-950'
                    : 'border-gray-300 bg-white'
                }`}></span>
                <span className={`text-sm font-mono mb-1 block transition-colors duration-300 ${
                  isDark ? 'text-neutral-500' : 'text-neutral-600'
                }`}>2025-April</span>
                <h4 className={`font-medium transition-colors duration-300 ${
                  isDark ? 'text-white' : 'text-neutral-900'
                }`}>Started Web Development</h4>
                <p className={`text-sm transition-colors duration-300 ${
                  isDark ? 'text-neutral-500' : 'text-neutral-600'
                }`}>Self-taught full stack journey begins</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Magic Contact Drafter */}
        <ContactDrafter isDark={isDark} />

        {/* Footer */}
        <footer className={`mt-20 pt-10 border-t text-center text-sm transition-colors duration-300 ${
          isDark 
            ? 'border-neutral-900 text-neutral-600'
            : 'border-gray-300 text-neutral-500'
        }`}>
          <p>© {new Date().getFullYear()} Anurag Sharma. Built with React & Tailwind.</p>
        </footer>

        {/* Floating Chat Widget */}
        <AIChatWidget isDark={isDark} />

      </div>
    </div>
  );
}
