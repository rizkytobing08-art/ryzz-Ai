"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-8">
      <h1 className="text-5xl font-bold mb-4">Ryzz AI Jalan! 🚀</h1>
      <p className="text-gray-400">Deployment berhasil. Tinggal sambungin AI</p>
    </main>
  )
}
