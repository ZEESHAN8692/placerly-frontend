import { useEffect, useState } from "react";
import { io } from "socket.io-client";


const socket = io("https://placerly-backend-1.onrender.com");

export default function UserChat() {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token")

    socket.emit("registerUser", { token });

    socket.on("userRegistered", (data) => {
      setUserId(data.userId);
    });

    // Listen room messages
    socket.on("messageHistory", (newMsgs) => {
      setMessages((prev) => [...prev, ...newMsgs]);
    });

    return () => socket.off();
  }, []);

  const send = () => {
    socket.emit("sendMessage", { message: msg });
    setMsg("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>User Chat</h2>

      <div style={{ height: 300, overflowY: "auto", border: "1px solid #ddd", padding: 10 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <b>{m.sender}:</b> {m.message}
          </div>
        ))}
      </div>

      <input
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Type message"
      />
      <button onClick={send}>Send</button>
    </div>
  );
}
