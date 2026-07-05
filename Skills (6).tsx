import React from "react";
import { motion } from "motion/react";
import { Download, MapPin, Mail } from "lucide-react";
import { AboutProfile } from "../types";

interface AboutProps {
  about: AboutProfile;
}

export default function About({ about }: AboutProps) {
  return (
    <section id="about" className="py-24 border-t border-slate-100 dark:border-slate-800/40">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-sans mb-4">
            About Me
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Bio on the Left */}
          <div className="md:col-span-8">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white font-sans mb-4">
              Designing Distributed Architectures with High Availability
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
              {about.bio}
            </p>

            {/* Resume Download Action */}
            <div className="mt-8">
              <a
                id="download-resume-btn"
                href={about.resumeUrl}
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-medium hover:bg-slate-800 dark:hover:bg-slate-100 shadow-md hover:shadow-lg transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            </div>
          </div>

          {/* Quick Info & Stats on the Right */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="p-6 rounded-xl glass-card dark:dark-glass-card font-mono hover:border-indigo-300 dark:hover:border-indigo-700/50 hover:scale-[1.02] transition-all">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                5+
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Years of Experience</div>
            </div>

            <div className="space-y-3 text-sm font-mono text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/20 dark:bg-slate-900/20 border border-white/10 dark:border-slate-800/10 backdrop-blur-md">
                <MapPin className="w-4 h-4 text-indigo-500" />
                <span>{about.location}</span>
              </div>
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/20 dark:bg-slate-900/20 border border-white/10 dark:border-slate-800/10 backdrop-blur-md">
                <Mail className="w-4 h-4 text-indigo-500" />
                <span>{about.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
