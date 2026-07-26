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
        <main className="flex min-h-screen flex-col bg-black text-white p-4">
          <h1 className="text-3xl font-bold text-center mb-4">Ryzz AI 🤖</h1>
          <div className="flex-1 overflow-y-auto mb-4 space-y-2">
            {chat.map((msg, i) => (
              <div key={i} className={msg.role === "Kamu" ? "text-right" : "text-left"}>
                <p className="bg-gray-800 inline-block p-3 rounded-lg max-w-[80%]">
                  <b>{msg.role}:</b> {msg.text}
                </p>
              </div>
            ))}
            {loading && <p className="text-gray-400">Ryzz lagi mikir...</p>}
          </div>
          <div className="flex gap-2">
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              className="flex-1 p-3 rounded bg-gray-900 border-gray-700" 
              placeholder="Tanya apa aja ke Ryzz..."/>
            <button onClick={sendMessage} className="bg-white text-black px-5 rounded font-bold">Kirim</button>
          </div>
        </main>
      )
    }
