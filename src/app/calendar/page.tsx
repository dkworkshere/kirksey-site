import Link from "next/link";

export default function CalendarPage() {
  const calId = encodeURIComponent("dkworkshere@gmail.com");
  const tz = encodeURIComponent("America/New_York");
  const src = `https://calendar.google.com/calendar/embed?src=${calId}&ctz=${tz}&showTitle=0&showPrint=0&showTabs=1&mode=MONTH`;

  return (
    <main className="mx-auto max-w-6xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Calendar</h1>
        <Link href="/" className="rounded border px-4 py-2 text-sm hover:bg-gray-100">Home</Link>
      </div>
      <div className="w-full aspect-[16/10] border rounded overflow-hidden bg-white">
        <iframe src={src} className="w-full h-full" frameBorder={0} aria-label="Google Calendar" />
      </div>
    </main>
  );
}
