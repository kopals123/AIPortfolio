import React, { useState, useEffect } from "react";
import { Sun, Moon, Cpu, Menu, X } from "lucide-react";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import AIChatWidget from "./components/AIChatWidget";
import Footer from "./components/Footer";
import portfolioData from "./data.json";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Initialize Theme class on document element
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") as "light" | "dark" | null;
    const initialTheme = savedTheme || "dark";
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 text-slate-800 dark:text-slate-100 transition-colors duration-350 font-sans relative">
      
      {/* Immersive glowing mesh gradient background for Frosted Glass theme */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] max-w-[800px] rounded-full bg-indigo-400/15 dark:bg-indigo-600/10 blur-[130px] animate-pulse" style={{ animationDuration: "12s" }} />
        <div className="absolute top-[30%] right-[-10%] w-[50vw] h-[50vw] max-w-[700px] rounded-full bg-purple-400/15 dark:bg-purple-600/10 blur-[120px] animate-pulse" style={{ animationDuration: "16s" }} />
        <div className="absolute bottom-[-10%] left-[15%] w-[55vw] h-[55vw] max-w-[800px] rounded-full bg-pink-400/10 dark:bg-pink-600/8 blur-[140px] animate-pulse" style={{ animationDuration: "14s" }} />
        <div className="absolute bottom-[20%] right-[5%] w-[40vw] h-[40vw] max-w-[600px] rounded-full bg-blue-400/12 dark:bg-blue-600/8 blur-[110px] animate-pulse" style={{ animationDuration: "10s" }} />
      </div>

      <header className="fixed top-0 left-0 w-full z-40 glass-nav dark:dark-glass-nav transition-colors">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("hero")}>
            <Cpu className="w-5 h-5 text-indigo-500 animate-pulse" />
            <span className="font-bold text-lg text-slate-900 dark:text-white font-sans tracking-tight">
              AIPortfolio
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-800 dark:text-slate-100">
            <button onClick={() => scrollToSection("about")} className="hover:text-indigo-500 transition-colors cursor-pointer">About</button>
            <button onClick={() => scrollToSection("skills")} className="hover:text-indigo-500 transition-colors cursor-pointer">Skills</button>
            <button onClick={() => scrollToSection("experience")} className="hover:text-indigo-500 transition-colors cursor-pointer">Experience</button>
            <button onClick={() => scrollToSection("projects")} className="hover:text-indigo-500 transition-colors cursor-pointer">Projects</button>
            <button onClick={() => scrollToSection("certifications")} className="hover:text-indigo-500 transition-colors cursor-pointer">Certifications</button>
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/40 bg-white/20 dark:bg-slate-950/20 backdrop-blur-md hover:bg-white/40 dark:hover:bg-slate-900/40 text-slate-500 dark:text-slate-400 transition-all cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 md:hidden rounded-xl border border-slate-200/50 dark:border-slate-800/40 bg-white/20 dark:bg-slate-950/20 backdrop-blur-md hover:bg-white/40 dark:hover:bg-slate-900/40 text-slate-500 dark:text-slate-400 transition-all cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200/40 dark:border-slate-800/30 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl px-6 py-4 flex flex-col gap-4 text-base font-semibold">
            <button onClick={() => scrollToSection("about")} className="text-left py-1 hover:text-indigo-500 transition-colors cursor-pointer">About</button>
            <button onClick={() => scrollToSection("skills")} className="text-left py-1 hover:text-indigo-500 transition-colors cursor-pointer">Skills</button>
            <button onClick={() => scrollToSection("experience")} className="text-left py-1 hover:text-indigo-500 transition-colors cursor-pointer">Experience</button>
            <button onClick={() => scrollToSection("projects")} className="text-left py-1 hover:text-indigo-500 transition-colors cursor-pointer">Projects</button>
            <button onClick={() => scrollToSection("certifications")} className="text-left py-1 hover:text-indigo-500 transition-colors cursor-pointer">Certifications</button>
          </div>
        )}
      </header>

      <main className="pt-16 pb-12 relative z-10">
        <Hero
          about={portfolioData.about}
          onScrollToContact={() => window.location.href = `mailto:${portfolioData.about.email}`}
          onScrollToProjects={() => scrollToSection("projects")}
        />
        <About about={portfolioData.about} />
        <Skills skills={portfolioData.skills} />
        <Experience experience={portfolioData.experience} />
        <Projects projects={portfolioData.projects} certifications={portfolioData.certifications} />
      </main>

      <Footer about={portfolioData.about} />
      <AIChatWidget />
    </div>
  );
}
