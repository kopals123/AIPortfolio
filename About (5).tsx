import React from "react";
import { motion } from "motion/react";
import { ArrowDown, Mail, Github, Linkedin, Cpu } from "lucide-react";
import { AboutProfile } from "../types";

interface HeroProps {
  about: AboutProfile;
  onScrollToContact: () => void;
  onScrollToProjects: () => void;
}

export default function Hero({ about, onScrollToContact, onScrollToProjects }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-5xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/40 dark:border-indigo-800/40 text-indigo-600 dark:text-indigo-400 text-xs font-mono mb-8 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
        >
          <Cpu className="w-3.5 h-3.5 animate-pulse" />
          <span>PORTFOLIO POWERED BY GENAI</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6 font-sans leading-[1.1]"
        >
          Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">{about.name}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg sm:text-2xl text-slate-600 dark:text-slate-300 font-medium mb-4 max-w-3xl mx-auto"
        >
          {about.title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed font-mono"
        >
          Expert in .NET 8, Clean Architecture, Cloud-Native Systems, and React. Building high-performance distributed microservices and elegant interfaces.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={onScrollToProjects}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            Explore Projects
          </button>
          <button
            onClick={onScrollToContact}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-medium border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            Let's Talk
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex items-center justify-center gap-6 text-slate-400 dark:text-slate-500"
        >
          <a
            href={about.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href={about.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${about.email}`}
            className="hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
          >
            <Mail className="w-5 h-5" />
          </a>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-slate-400 dark:text-slate-500 cursor-pointer hidden md:block"
          onClick={onScrollToProjects}
        >
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </div>
    </section>
  );
}
