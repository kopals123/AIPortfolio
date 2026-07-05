import React from "react";
import { motion } from "motion/react";
import { Github, Activity, Sparkles, Server, Award, Calendar } from "lucide-react";
import { ProjectItem, CertificationItem } from "../types";

interface ProjectsProps {
  projects: ProjectItem[];
  certifications: CertificationItem[];
}

export default function Projects({ projects, certifications }: ProjectsProps) {
  // Select appropriate icons depending on project title
  const getProjectIcon = (title: string) => {
    if (title.toLowerCase().includes("ai")) {
      return <Sparkles className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />;
    } else if (title.toLowerCase().includes("infrastructure") || title.toLowerCase().includes("kafka")) {
      return <Server className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />;
    } else {
      return <Activity className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />;
    }
  };

  return (
    <section id="projects" className="py-24 border-t border-slate-100 dark:border-slate-800/40 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Featured Projects */}
          <div className="lg:col-span-7">
            <div className="mb-10">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-sans mb-4">
                Featured Projects
              </h2>
              <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
            </div>

            <div className="space-y-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col rounded-2xl glass-panel dark:dark-glass-panel hover:scale-[1.01] hover:shadow-2xl transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-700/50 group overflow-hidden"
                >
                  <div className="p-6 sm:p-8 flex-grow">
                    {/* Header with Icon and Subtitle */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 rounded-xl bg-indigo-50/40 dark:bg-indigo-950/40 border border-indigo-100/30 dark:border-indigo-800/20 group-hover:bg-indigo-100/60 dark:group-hover:bg-indigo-900/60 transition-colors">
                        {getProjectIcon(project.title)}
                      </div>
                      <div>
                        <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block font-bold">
                          {project.subtitle}
                        </span>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white font-sans leading-tight mt-0.5">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description - bright, highly readable color */}
                    <p className="text-sm sm:text-base text-slate-800 dark:text-slate-100 leading-relaxed mb-6 font-sans">
                      {project.description}
                    </p>

                    {/* Metrics if present */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="mb-6 p-4 rounded-xl bg-slate-100/40 dark:bg-slate-900/40 border border-slate-200/30 dark:border-slate-800/20">
                        <h4 className="text-xs font-mono text-slate-500 dark:text-slate-350 uppercase tracking-wider mb-2 font-bold">Key Metrics</h4>
                        <ul className="space-y-1.5">
                          {project.metrics.map((metric, idx) => (
                            <li key={idx} className="text-xs font-mono text-indigo-700 dark:text-indigo-300 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                              <span>{metric}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Technology Pills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-100/40 dark:bg-slate-900/40 text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-800/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons Footer */}
                  <div className="p-4 sm:p-6 bg-slate-100/20 dark:bg-slate-950/20 border-t border-slate-200/20 dark:border-slate-800/30 backdrop-blur-md flex items-center justify-end gap-4">
                    <a
                      id={`project-${index}-github`}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>Source Code</span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Professional Certifications */}
          <div id="certifications" className="lg:col-span-5 lg:pl-4">
            <div className="mb-10">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white font-sans mb-4">
                Certifications
              </h2>
              <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
            </div>

            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl glass-panel dark:dark-glass-panel hover:scale-[1.02] hover:shadow-lg transition-all duration-300 hover:border-indigo-300 dark:hover:border-indigo-700/50 flex flex-col justify-between"
                >
                  <div>
                    <div className="p-3 rounded-xl bg-indigo-50/40 dark:bg-indigo-950/40 border border-indigo-100/30 dark:border-indigo-800/20 w-fit mb-4">
                      <Award className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                    </div>
                    <h3 className="text-base font-bold text-slate-800 dark:text-white font-sans leading-snug mb-2">
                      {cert.name}
                    </h3>
                    <p className="text-xs font-mono text-slate-700 dark:text-slate-200 mb-2">
                      Issued by {cert.issuer}
                    </p>
                    <p className="text-[11px] font-mono text-indigo-700 dark:text-indigo-300 font-bold bg-indigo-50/50 dark:bg-indigo-950/50 px-2 py-1 rounded w-fit border border-indigo-100/30 dark:border-indigo-800/20">
                      ID: {cert.credentialId}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center gap-1.5 text-xs font-mono text-slate-700 dark:text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                    <span>Issued in {cert.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
