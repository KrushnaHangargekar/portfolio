import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { useState } from "react";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi! 👋 I'm Krushna's AI assistant. Feel free to ask me anything about his work, skills, or how to get in touch!", isBot: true }
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { id: Date.now(), text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    try {
      // Fetch bot response
      const res = await fetch("/.netlify/functions/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) throw new Error('Failed to fetch');

      const data = await res.json();
      setMessages((prev) => [...prev, { id: Date.now(), text: data.reply || "Sorry, I couldn't process that.", isBot: true }]);
    } catch (error) {
      setMessages((prev) => [...prev, { id: Date.now(), text: "Oops, something went wrong. Please try again.", isBot: true }]);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-50 p-4 rounded-full glow"
        style={{ background: "var(--gradient-primary)" }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{
          boxShadow: isOpen 
            ? "0 0 30px hsl(270 70% 60% / 0.5)" 
            : ["0 0 20px hsl(270 70% 60% / 0.3)", "0 0 40px hsl(320 70% 60% / 0.4)", "0 0 20px hsl(270 70% 60% / 0.3)"]
        }}
        transition={{ duration: 2, repeat: isOpen ? 0 : Infinity }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-6 h-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-44 right-6 z-50 w-80 sm:w-96 glass rounded-2xl overflow-hidden"
          >
            {/* Header */}
            <div 
              className="p-4 flex items-center gap-3"
              style={{ background: "var(--gradient-primary)" }}
            >
              <div className="p-2 rounded-full bg-white/20">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white">AI Assistant</h3>
                <p className="text-xs text-white/70">Always here to help</p>
              </div>
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${message.isBot ? "" : "flex-row-reverse"}`}
                >
                  <div className={`shrink-0 p-2 rounded-full h-fit ${
                    message.isBot ? "bg-primary/20" : "bg-accent/20"
                  }`}>
                    {message.isBot ? (
                      <Bot className="w-4 h-4 text-primary" />
                    ) : (
                      <User className="w-4 h-4 text-accent" />
                    )}
                  </div>
                  <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${
                    message.isBot 
                      ? "bg-secondary rounded-tl-none" 
                      : "bg-primary text-primary-foreground rounded-tr-none"
                  }`}>
                    {message.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleSend(); } }}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 rounded-xl bg-secondary border border-border focus:border-primary outline-none text-sm"
                />
                <motion.button
                  onClick={handleSend}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-xl text-white"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  <Send className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;