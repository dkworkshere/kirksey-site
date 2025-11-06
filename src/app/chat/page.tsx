"use client";
import Link from "next/link";
import { useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function ChatPage() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);

  async function send() {
    if (!input.trim() || busy) return;
    setBusy(true);
    const history = [...msgs, { role: "user", content: input }];
    setMsgs(history); setInput("");
    const res = await fetch("/api/chat", { method: "POST", headers: { "Content-Type":"application/json" }, body: JSON.stringify({ messages: history }) });
    const j = await res.json(); if (res.ok && j.ok) setMsgs(m => [...m, { role: "assistant", content: j.text }]);
    setBusy(false);
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">AI Chatbot</h1>
        <Link href="/" className="rounded border px-4 py-2 text-sm hover:bg-gray-100">Home</Link>
      </div>
      <div className="min-h-56 rounded border p-3 whitespace-pre-wrap">
        {msgs.map((m,i)=><div key={i}><b>{m.role}:</b> {m.content}</div>)}
      </div>
      <div className="mt-3 flex gap-2">
        <input className="border rounded p-2 flex-1" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{ if(e.key==="Enter") send(); }} />
        <button onClick={send} disabled={busy} className="rounded bg-black text-white px-4 disabled:opacity-50">{busy?"Thinking…":"Send"}</button>
      </div>
    </main>
  );
}
