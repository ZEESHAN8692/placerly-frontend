import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { MessageCircle, X, Send, Minimize2 } from "lucide-react";

const socket = io("http://localhost:8000");

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [userId, setUserId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => scrollToBottom(), [messages]);

  useEffect(() => {
    const token = Cookies.get("token");
    socket.emit("registerUser", { token });

    const onUserRegistered = (data) => setUserId(data.userId);

    const onHistory = (newMsgs) => {
      setMessages((prev) => {
        // Duplicate avoid + append
        const ids = new Set(prev.map((m) => m._id || m.timestamp));
        const filtered = newMsgs.filter((m) => !ids.has(m._id || m.timestamp));
        return [...prev, ...filtered];
      });
    };

    const onReceive = (data) => {
      setMessages((prev) => [...prev, data]);
    };

    socket.on("userRegistered", onUserRegistered);
    socket.on("messageHistory", onHistory);
    socket.on("receiveMessage", onReceive);

    return () => {
      socket.off("userRegistered", onUserRegistered);
      socket.off("messageHistory", onHistory);
      socket.off("receiveMessage", onReceive);
    };
  }, []);

  const send = (e) => {
    e.preventDefault();
    if (!msg.trim()) return;
    socket.emit("sendMessage", { message: msg });
    setMsg("");
  };

  const formatTime = (ts) => {
    if (!ts) return "";
    const d = new Date(ts);
    return isNaN(d.getTime()) ? "" : d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  // const minimizeChat = () => setIsMinimized(true);
  const toggleMinimize = () => setIsMinimized(prev => !prev);


  if (!isOpen) {
    return (
      <div className="pointer-events-auto z-[9999] fixed bottom-6 right-6">
        <button
          onClick={toggleChat}
          className="bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300"
        >
          <MessageCircle className="w-8 h-8" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isMinimized ? "w-80 h-16" : "w-96 h-[500px]"
        }`}
    >
      <div className="bg-[#0B1F3A]/95 backdrop-blur-xl border border-[#F8FAFC]/10 rounded-2xl shadow-2xl flex flex-col h-full overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B1F3A] to-[#1a365d] p-4 border-b border-[#F8FAFC]/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-[#0B1F3A]" />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">Support Chat</h3>
                <p className="text-xs text-gray-300">
                  {userId ? `User: ${userId}` : "Connecting..."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button onClick={toggleMinimize} className="p-2 hover:bg-white/10 rounded-lg">
                <Minimize2 className="w-4 h-4 text-gray-300" />
              </button>
              <button onClick={toggleChat} className="p-2 hover:bg-white/10 rounded-lg">
                <X className="w-4 h-4 text-gray-300" />
              </button>
            </div>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <MessageCircle className="w-12 h-12 mb-4 opacity-50" />
                  <p className="text-center text-sm">No messages yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-xs px-4 py-3 rounded-2xl ${m.sender === "user"
                            ? "bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] rounded-br-none"
                            : "bg-white/10 text-white border border-white/20 rounded-bl-none"
                          }`}
                      >
                        <p className="text-sm">{m.message}</p>
                        <div className="text-xs mt-1 text-gray-300">{formatTime(m.timestamp)}</div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[#F8FAFC]/10 bg-[#0B1F3A]/80">
              <form onSubmit={send} className="flex gap-3">
                <input
                  type="text"
                  value={msg}
                  onChange={(e) => setMsg(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400"
                />
                <button
                  type="submit"
                  disabled={!msg.trim()}
                  className="px-6 py-3 bg-gradient-to-r from-[#F9C74F] to-[#F9844A] text-[#0B1F3A] rounded-xl font-semibold"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
