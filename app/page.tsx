"use client";
import { useState, useRef } from "react";

export default function Home() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [mode, setMode] = useState<"chat" | "generate">("chat");
  const fileRef = useRef<HTMLInputElement>(null);

  const sendMessage =
