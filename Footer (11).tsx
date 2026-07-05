import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, Sparkles, Loader2 } from "lucide-react";
import { ChatMessage } from "../types";

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          role: "assistant",
          content: "Hi, I'm Akhil Koppala's AI Portfolio Assistant! Ask me anything about his projects, skills, certifications, or professional experience. How can I help you today?",
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.content
      }));

      // Hits the .NET backend API /api/chat
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content, history: historyPayload })
      });

      if (!res.ok) {
        if (res.status === 429) {
          throw new Error("Rate limit exceeded (Max 25 requests/min). Please wait a bit.");
        }
        throw new Error("Failed to reach the AI Service. Please try again.");
      }

      const data = await res.json();
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now()}-reply`,
        role: "assistant",
        content: data.response,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessageContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, lineIdx) => {
      if (line.trim().startsWith("- ") || line.trim().startsWith("* ")) {
        const text = line.replace(/^[-*]\s+/, "");
        return (
          <ul key={lineIdx} className="list-disc pl-5 mb-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
            <li>{parseInlineFormatting(text)}</li>
          </ul>
        );
      }
      if (line.trim() === "") {
        return <div key={lineIdx} className="h-2" />;
      }
      return (
        <p key={lineIdx} className="mb-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
          {parseInlineFormatting(line)}
        </p>
      );
    });
  };

  const parseInlineFormatting = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={idx} className="font-bold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={idx} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-pink-600 dark:text-pink-400 font-mono text-xs">
            {part.slice(1, -1)}
          </code>
        );
      }
      return part;
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl hover:shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all z-50 cursor-pointer flex items-center justify-center"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div
          id="ai-chat-panel"
          className="fixed bottom-24 right-6 w-[340px] sm:w-[400px] h-[520px] max-h-[80vh] rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6 duration-350 glass-panel dark:dark-glass-panel border-white/30 dark:border-slate-800/40"
        >
          <div className="p-4 bg-gradient-to-r from-indigo-600/90 to-purple-600/90 backdrop-blur-md text-white flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-white/20 border border-white/10">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm">Portfolio Assistant</span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-mono bg-emerald-500 text-white font-medium uppercase tracking-wider animate-pulse">
                    Live
                  </span>
                </div>
                <p className="text-[10px] text-indigo-200">Powered by Hugging Face / Gemini API</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3.5 rounded-2xl text-xs sm:text-sm ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-indigo-600/90 to-indigo-700/90 border border-indigo-500/35 text-white rounded-br-none shadow-md"
                      : "glass-card dark:dark-glass-card text-slate-800 dark:text-slate-100 rounded-bl-none"
                  }`}
                >
                  {renderMessageContent(msg.content)}
                  <div
                    className={`text-[9px] mt-1 text-right block ${
                      msg.role === "user" ? "text-indigo-200" : "text-slate-400"
                    }`}
                  >
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 justify-start items-center">
                <div className="w-7 h-7 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  <Loader2 className="w-3.5 h-3.5 text-indigo-500 animate-spin" />
                </div>
                <div className="p-3 rounded-2xl rounded-bl-none glass-card dark:dark-glass-card text-slate-500 text-xs sm:text-sm font-mono flex items-center gap-1">
                  <span>Assistant is thinking</span>
                  <span className="animate-pulse">...</span>
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/20 text-red-600 dark:text-red-400 text-xs">
                {error}
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="px-4 py-2 border-t border-white/10 dark:border-slate-800/30 flex flex-wrap gap-1.5 bg-white/10 dark:bg-slate-950/10 backdrop-blur-sm">
              <button
                onClick={() => setInput("Tell me about Akhil's AI portfolio project.")}
                className="text-[10px] sm:text-xs font-mono px-2 py-1 rounded glass-card dark:dark-glass-card text-slate-600 dark:text-slate-350 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors cursor-pointer"
              >
                AI Portfolio Project?
              </button>
              <button
                onClick={() => setInput("What is his Kafka message optimization experience?")}
                className="text-[10px] sm:text-xs font-mono px-2 py-1 rounded glass-card dark:dark-glass-card text-slate-600 dark:text-slate-355 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors cursor-pointer"
              >
                Kafka Optimization?
              </button>
              <button
                onClick={() => setInput("Show me Akhil's technical skills.")}
                className="text-[10px] sm:text-xs font-mono px-2 py-1 rounded glass-card dark:dark-glass-card text-slate-600 dark:text-slate-355 hover:border-indigo-400 dark:hover:border-indigo-500 transition-colors cursor-pointer"
              >
                List Skills?
              </button>
            </div>
          )}

          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-white/10 dark:border-slate-800/30 bg-white/10 dark:bg-slate-950/20 backdrop-blur-md flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me a question about Akhil..."
              disabled={isLoading}
              className="flex-grow px-3 py-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800/40 bg-white/20 dark:bg-slate-950/30 text-slate-800 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder-slate-400"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-all disabled:opacity-40 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
