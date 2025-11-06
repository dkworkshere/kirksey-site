"use client";
import { useState } from "react";

export default function Contact(){
  const [status,setStatus]=useState<"idle"|"sending"|"sent"|"error">("idle");
  const [err,setErr]=useState("");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault(); setStatus("sending"); setErr("");
    const fd=new FormData(e.currentTarget);
    const payload={ name:String(fd.get("name")||""), email:String(fd.get("email")||""), message:String(fd.get("message")||"") };
    try{
      const r=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(payload)});
      const j=await r.json(); if(!r.ok||!j.ok){ setStatus("error"); setErr(j.error||"Failed"); return; }
      setStatus("sent"); e.currentTarget.reset();
    }catch(e:any){ setStatus("error"); setErr(e?.message||"Network error"); }
  }
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold mb-4">Contact</h1>
      <form onSubmit={onSubmit} className="grid gap-3 max-w-lg">
        <input name="name" required className="border rounded p-2" placeholder="Name" />
        <input name="email" type="email" required className="border rounded p-2" placeholder="Email" />
        <textarea name="message" required rows={5} className="border rounded p-2" placeholder="Message" />
        <button disabled={status==="sending"} className="rounded bg-black text-white px-4 py-2 disabled:opacity-50">
          {status==="sending"?"Sending…":"Send"}
        </button>
        {status==="sent" && <p className="text-green-600">Message sent.</p>}
        {status==="error" && <p className="text-red-600">Error: {err}</p>}
      </form>
    </main>
  );
}
