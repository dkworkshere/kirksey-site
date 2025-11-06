export async function GET() {
  return new Response("ok", { status: 200 });
}

export async function POST(req: Request) {
  try {
    const body = await req.text();
    return new Response(JSON.stringify({ ok: true, echo: body || null }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e:any) {
    return new Response(JSON.stringify({ ok:false, error:e?.message || "err" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
