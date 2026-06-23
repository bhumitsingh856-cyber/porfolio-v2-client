"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PixelBot } from "../home/Logo";
import EnhancedMarkdown from "../primitives/Markdown";

// ─── Types ─────────────────────────────────────────────────────────

type Message = {
  role: "user" | "ai";
  content: string;
};

type ChatState = "idle" | "loading" | "error";

// ─── Component ─────────────────────────────────────────────────────

const SUGGESTIONS = [
  "Introduce Bhumit.",
  "What is Bhumit's tech stack?",
  "Tell me about his AI projects.",
  "Where is he studying?",
  "How can I contact?",
  "What's his github, linkedin profile?",
  "What are his certifications?"
];

export function AboutChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [chatState, setChatState] = useState<ChatState>("idle");
  const [stream, setStream] = useState<string>("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom

  const generateId = () =>
    `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

  const handleSend = async (s: string = input) => {
    setChatState("loading");
    setMessages((prev) => [...prev, { role: "user", content: s }]);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ thread: generateId(), query: s }),
      });
      let ac: string = "";
      if (!res.body) return;
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const text = decoder.decode(value);
        ac += text;
        setChatState("idle");
        setStream((prev) => ac);
      }
      setMessages((prev) => [...prev, { role: "ai", content: ac }]);
    } catch {
      setChatState("error");
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Something went wrong" },
      ]);
    } finally {
      setChatState("idle");
      setStream("");
      setInput("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, stream]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);
 
  return (
    <>
      {/* ─── Floating Toggle Button ─────────────────────────────── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex h-14 w-14 cursor-pointer items-center justify-center rounded-2xl border hairline bg-background shadow-xl transition-colors hover:bg-muted/50"
            aria-label="Open chat"
          >
            <div className="h-8 w-8">
              <PixelBot
                size={44}
                isTyping={chatState === "loading"}
                onClick={() => setIsOpen(true)}
              />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* ─── Side Panel (pushes content, not overlay) ───────────── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
            />

            {/* Chat Panel - slides from right, fixed width */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 z-50 flex h-[100dvh] w-full max-w-[420px] flex-col border-l hairline bg-background shadow-2xl"
            >
              {/* Header */}
              <div className="flex shrink-0 items-center justify-between border-b hairline bg-muted/20 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border hairline bg-background">
                    <div className="h-7 w-7">
                      <PixelBot
                        size={34}
                        isTyping={chatState === "loading"}
                        onClick={() => setIsOpen(true)}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-semibold tracking-tight">
                      Bhumit's Assistant
                    </h3>
                    <div className="flex items-center gap-1.5">
                      <motion.span
                        className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        {chatState === "loading" ? "Thinking..." : "Online"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
                    onClick={() => setMessages([])}
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
                    aria-label="Close chat"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {messages.length === 0 &&
                SUGGESTIONS.map((s, i) => (
                  <div key={i} className="flex flex-col mt-2 gap-2">
                    <button
                      onClick={() => {
                        handleSend(s);
                      }}
                      className="rounded-full border hairline bg-muted/30 w-fit mx-auto px-4 py-3 cursor-pointer"
                    >
                      {s}
                    </button>
                  </div>
                ))}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                {messages.map((m, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        m.role === "user"
                          ? "bg-foreground text-paper rounded-tr-none"
                          : "max-w-[100%] rounded-2xl px-4 py-3 text-sm leading-relaxed "
                      }`}
                    >
                      {m.role === "ai" ? (
                        <EnhancedMarkdown content={m.content} />
                      ) : (
                        m.content
                      )}
                    </div>
                  </motion.div>
                ))}
                {stream && (
                  <div className="max-w-[100%] rounded-2xl px-4 py-3 text-sm leading-relaxed ">
                    <EnhancedMarkdown content={stream} />
                  </div>
                )}
                {/* Typing indicator */}
                {chatState === "loading" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="flex items-center gap-1 rounded-2xl rounded-tl-none border hairline bg-muted/30 px-4 py-3">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                          animate={{ y: [0, -4, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form
                onSubmit={handleSubmit}
                className="shrink-0 flex items-center gap-2 border-t hairline bg-muted/10 px-4 py-3"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Bhumit..."
                  disabled={chatState === "loading"}
                  className="flex-1 bg-transparent px-2 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || chatState === "loading"}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground text-paper transition-all hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
                  aria-label="Send message"
                >
                  <Send size={14} />
                </button>
              </form>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
