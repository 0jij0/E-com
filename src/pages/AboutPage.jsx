// src/pages/AboutPage.jsx
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Code2, Database, Layout } from 'lucide-react';

export default function AboutPage() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-6 py-20"
    >
      {/* 1. The "Hook" - Intro */}
      <div className="max-w-3xl mx-auto text-center mb-20">
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
        >
          More Than Just a Store.
        </motion.h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Aura represents the intersection of modern design and powerful technology. 
          This project acts as a comprehensive demonstration of full-stack development capabilities.
        </p>
      </div>

      {/* 2. The Developer Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="aspect-[4/5] bg-gray-200 rounded-2xl overflow-hidden">
            {/* REPLACE THIS SRC WITH YOUR OWN PHOTO URL LATER */}
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" 
              alt="Developer" 
              className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-6">Meet the Developer</h2>
          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            Hi, I'm a 4th-year university student passionate about building intuitive and dynamic web applications. 
            I created <strong>Aura</strong> to bridge the gap between aesthetic design and robust backend logic.
          </p>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            This application manages real-time state, secure authentication, and complex database relationships—all wrapped in a smooth, animated interface.
          </p>
          
          <div className="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
              <Github size={20} />
              <span>GitHub</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Linkedin size={20} />
              <span>LinkedIn</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* 3. The Tech Stack Grid */}
      <div className="bg-gray-50 rounded-3xl p-12">
        <h2 className="text-3xl font-bold text-center mb-12">Built With</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {/* Tech 1 */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Code2 size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Frontend</h3>
            <p className="text-gray-500">React, Framer Motion, and Tailwind CSS for a responsive, animated UI.</p>
          </div>
          
          {/* Tech 2 */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Database size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Backend</h3>
            <p className="text-gray-500">Supabase (PostgreSQL) for reliable data storage and real-time capabilities.</p>
          </div>

          {/* Tech 3 */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:-translate-y-1 transition-transform">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Layout size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">State & Auth</h3>
            <p className="text-gray-500">Context API for global state management and Google OAuth for secure sign-ins.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}