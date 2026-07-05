import React from "react";
import { Cpu, Heart } from "lucide-react";
import { AboutProfile } from "../types";

interface FooterProps {
  about: AboutProfile;
}

export default function Footer({ about }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/20 dark:border-slate-800/40 bg-white/20 dark:bg-slate-950/20 backdrop-blur-md py-12">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-2">
          <Cpu className="w-5 h-5 text-indigo-500" />
          <span className="font-bold text-slate-800 dark:text-white font-sans tracking-tight">
            AIPortfolio
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 dark:text-slate-550 font-mono text-center flex items-center justify-center gap-1.5">
          <span>&copy; {currentYear} {about.name}. Built with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-pulse" />
          <span>using .NET 8, React, & Tailwind v4</span>
        </p>

        <div className="flex items-center gap-6 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 font-sans">
          <a
            href={about.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-500 transition-colors"
          >
            GitHub
          </a>
          <a
            href={about.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-500 transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${about.email}`}
            className="hover:text-indigo-500 transition-colors"
          >
            Contact
          </a>
        </div>

      </div>
    </footer>
  );
}
