"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if(!input) return;
    setChat([...chat, {role: "Kamu", text: input}]);
    setInput("");
    setLoading(true);
    
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({message: input})
    });
    const data = await res.json();
    setChat(prev => [...prev, {role: "Ryzz AI", text: data.text}]);
    setLoading(false);
  }

  return (
    <div style={{background: "#0a0a0a", color: "white", minHeight: "100vh", display: "flex", flexDirection: "column", padding: "16px", fontFamily: "sans-serif"}}>
      <h1 style={{fontSize: "28px", fontWeight: "bold", textAlign: "center", marginBottom: "16px"}}>Ryzz AI 🤖</h1>
      
      <div style={{flex: 1, overflowY: "auto", marginBottom: "16px"}}>
        {chat.map((msg, i) => (
          <div key={i} style={{display: "flex", justifyContent: msg.role === "Kamu" ? "flex-end" : "flex-start", marginBottom: "10px"}}>
            <p style={{
              background: msg.role === "Kamu" ? "#3b82f6" : "#2a2a2a", 
              padding: "12px", 
              borderRadius: "12px", 
              maxWidth: "80%"
            }}>
              <b>{msg.role}:</b> {msg.text}
            </p>
          </div>
        ))}
        {loading && <p style={{color: "#888"}}>Ryzz lagi mikir...</p>}
      </div>

      <div style={{display: "flex", gap: "8px"}}>
        <input 
          value={input} 
          onChange={e => setInput(e.target.value)} 
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          style={{flex: 1, padding: "12px", borderRadius: "8px", border: "1px solid #333", background: "#1a1a1a", color: "white"}}
          placeholder="Tanya apa aja ke Ryzz..."/>
        <button 
          onClick={sendMessage} 
          style={{background: "white", color: "black", padding: "12px 20px", borderRadius: "8px", border: "none", fontWeight: "bold", cursor: "pointer"}}
        >
          Kirim
        </button>
      </div>
    </div>
  )
}
