import React, { useState } from "react";
import { Send, Mail, MapPin, CheckCircle2 } from "lucide-react";
import { AboutProfile } from "../types";

interface ContactProps {
  about: AboutProfile;
}

export default function Contact({ about }: ContactProps) {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 border-t border-slate-100 dark:border-slate-800/40">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white font-sans mb-4">
            Get In Touch
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5 space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white font-sans">
              Let's build something extraordinary together
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-sans text-sm sm:text-base">
              I'm always open to discussing full-time opportunities, system design consultations, contract engineering projects, and technical leadership roles. Drop me a line!
            </p>

            <div className="space-y-4 pt-4 text-sm font-mono text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-3 p-4 rounded-xl glass-panel dark:dark-glass-panel">
                <div className="p-2.5 rounded-lg bg-indigo-50/40 dark:bg-indigo-950/40 text-indigo-500 border border-indigo-100/20 dark:border-indigo-800/20">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Direct Email</span>
                  <a href={`mailto:${about.email}`} className="hover:text-indigo-500 dark:hover:text-indigo-400 font-semibold truncate block">
                    {about.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl glass-panel dark:dark-glass-panel">
                <div className="p-2.5 rounded-lg bg-indigo-50/40 dark:bg-indigo-950/40 text-indigo-500 border border-indigo-100/20 dark:border-indigo-800/20">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Office Location</span>
                  <span className="font-semibold block text-slate-700 dark:text-slate-200">
                    {about.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl glass-panel dark:dark-glass-panel hover:shadow-2xl transition-all duration-350 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-500 dark:text-slate-400">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    name="name"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/40 bg-white/30 dark:bg-slate-950/30 backdrop-blur-md text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder-slate-400"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-500 dark:text-slate-400">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/40 bg-white/30 dark:bg-slate-950/30 backdrop-blur-md text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder-slate-400"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-500 dark:text-slate-400">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  name="subject"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/40 bg-white/30 dark:bg-slate-950/30 backdrop-blur-md text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder-slate-400"
                  placeholder="Enterprise Architecture Collaboration"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-slate-500 dark:text-slate-400">Message Content</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  name="message"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/40 bg-white/30 dark:bg-slate-950/30 backdrop-blur-md text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none placeholder-slate-400"
                  placeholder="Tell me about your system architectural challenges..."
                />
              </div>

              {isSuccess && (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-850/30 text-emerald-750 dark:text-emerald-400 text-xs sm:text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>Message sent successfully! Alex will contact you shortly.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl font-medium bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
