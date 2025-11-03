import React, { useState, useRef, useEffect } from "react";
import { FiSend, FiUser, FiX } from "react-icons/fi";
import { motion } from "framer-motion";

const ChatBox = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can we help you today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const [open, setOpen] = useState(true);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Simulate bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Thank you for your message! 😊" },
      ]);
    }, 1000);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!open)
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] p-4 rounded-full shadow-lg hover:scale-105 transition-transform"
      >
        💬
      </button>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 w-80 md:w-96 bg-[#0B1F3A]/95 border border-[#F8FAFC]/10 rounded-2xl shadow-xl backdrop-blur-md overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-[#08101D] border-b border-[#F8FAFC]/10">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
          <p className="text-[#F8FAFC] font-semibold">Placerly • Online</p>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="text-[#F8FAFC]/60 hover:text-[#F9C74F] transition"
        >
          <FiX size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="p-4 space-y-3 h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-[#F9C74F]/30">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow-md ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A]"
                  : "bg-[#08101D]/70 text-[#F8FAFC]"
              }`}
            >
              {msg.text}
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="flex items-center p-3 border-t border-[#F8FAFC]/10 bg-[#08101D]"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-3 py-2 bg-transparent border border-[#F8FAFC]/20 rounded-lg text-[#F8FAFC] placeholder-[#F8FAFC]/40 focus:ring-2 focus:ring-[#F9C74F] focus:border-transparent text-sm"
        />
        <button
          type="submit"
          className="ml-3 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] p-2 rounded-lg hover:opacity-90 transition-all"
        >
          <FiSend className="text-[#0B1F3A]" size={18} />
        </button>
      </form>
    </motion.div>
  );
};

export default ChatBox;
