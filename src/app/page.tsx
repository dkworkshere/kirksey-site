import Link from "next/link";
export default function Page(){
  return (
    <main className="mx-auto max-w-5xl px-6 py-24 text-center">
      <h1 className="text-5xl font-extrabold">Kirksey Cloud</h1>
      <p className="mt-4 text-zinc-600">Next.js + Tailwind + AI + Email</p>
      <div className="mt-8 flex items-center justify-center gap-4">
        <Link href="/chat" className="rounded bg-black px-5 py-3 text-white">AI Chatbot</Link>
        <Link href="/contact" className="rounded border px-5 py-3">Contact</Link>
      </div>
    </main>
  );
}
