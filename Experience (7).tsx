import React from "react";
import { motion } from "motion/react";
import { Check, Code2, Database, Terminal } from "lucide-react";
import { SkillCategory } from "../types";

interface SkillsProps {
  skills: SkillCategory[];
}

export default function Skills({ skills }: SkillsProps) {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "backend":
        return <Terminal className="w-5 h-5 text-indigo-500" />;
      case "frontend":
        return <Code2 className="w-5 h-5 text-indigo-500" />;
      case "cloud & devops":
        return <Database className="w-5 h-5 text-indigo-500" />;
      default:
        return <Check className="w-5 h-5 text-indigo-500" />;
    }
  };

  return (
    <section id="skills" className="py-24 border-t border-slate-100 dark:border-slate-800/40">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-sans mb-4">
            Technical Skill Matrix
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 sm:p-8 rounded-2xl glass-panel dark:dark-glass-panel hover:scale-[1.01] hover:shadow-xl transition-all duration-300 group hover:border-indigo-300 dark:hover:border-indigo-700/50"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-indigo-50/40 dark:bg-indigo-950/40 border border-indigo-100/30 dark:border-indigo-800/20 group-hover:bg-indigo-100/60 dark:group-hover:bg-indigo-900/60 transition-colors">
                  {getCategoryIcon(category.category)}
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white font-sans">
                  {category.category}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {category.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-lg glass-card dark:dark-glass-card font-mono text-xs sm:text-sm text-slate-700 dark:text-slate-200 hover:scale-[1.02] transition-all"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
