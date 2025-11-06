"use client";
import { useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

export default function ChatPage() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");

  async function send() {
    const body = JSON.stringify({ messages: [...msgs, { role: "user", content: input }] });
    const res = await fetch("/api/chat", { method: "POST", body });
    if (!res.body) return;
    const reader = res.body.getReader();
    let text = "";
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      text += new TextDecoder().decode(value);
      setMsgs(m => {
        const keep = m.filter(x => x.role !== "assistant");
        return [...keep, { role: "assistant", content: text }];
      });
    }
    setMsgs(m => [...m, { role: "user", content: input }]);
    setInput("");
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold mb-4">AI Chatbot</h1>
      <div className="min-h-56 rounded border p-3 whitespace-pre-wrap">
        {msgs.map((m,i)=><div key={i}><b>{m.role}:</b> {m.content}</div>)}
      </div>
      <div className="mt-3 flex gap-2">
        <input className="border rounded p-2 flex-1" value={input} onChange={e=>setInput(e.target.value)} />
        <button onClick={send} className="rounded bg-black text-white px-4">Send</button>
      </div>
    </main>
  );
}
