import React from "react";
import { Briefcase, Calendar } from "lucide-react";
import { ExperienceItem } from "../types";

interface ExperienceProps {
  experience: ExperienceItem[];
}

export default function Experience({ experience }: ExperienceProps) {
  return (
    <section id="experience" className="py-24 border-t border-slate-100 dark:border-slate-800/40">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-sans mb-4">
            Professional Experience
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
        </div>

        <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-4 md:ml-32 space-y-12">
          {experience.map((item, index) => (
            <div key={index} className="relative pl-8 sm:pl-12 group">
              <div className="absolute -left-4.5 top-1.5 w-9 h-9 rounded-full border-4 border-white dark:border-slate-950 bg-indigo-600 flex items-center justify-center shadow-sm">
                <Briefcase className="w-3.5 h-3.5 text-white" />
              </div>

              <div className="hidden md:block absolute right-full mr-12 top-1.5 text-right w-24">
                <span className="font-mono text-sm font-bold text-indigo-600 dark:text-indigo-400">
                  {item.period}
                </span>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl glass-panel dark:dark-glass-panel hover:scale-[1.01] hover:shadow-lg transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-700/50">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white font-sans">
                      {item.role}
                    </h3>
                    <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 font-sans">
                      {item.company}
                    </p>
                  </div>
                  <div className="inline-flex md:hidden items-center gap-1.5 px-3 py-1 rounded-full glass-card dark:dark-glass-card font-mono text-xs text-slate-700 dark:text-slate-300 self-start">
                    <Calendar className="w-3 h-3" />
                    <span>{item.period}</span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-sans">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
