import type { APIRoute } from "astro";
import { loadSchedule } from "../../lib/load-schedule";
import { icsHeaders, renderCalendar } from "../../lib/schedule";

export async function getStaticPaths() {
  const days = await loadSchedule();
  return days.map((day) => ({ params: { day: day.date } }));
}

export const GET: APIRoute = async ({ params }) => {
  const days = await loadSchedule();
  const day = days.find((entry) => entry.date === params.day);
  if (!day) return new Response("Not found", { status: 404 });
  return new Response(renderCalendar([day], `Do iOS 2026 — ${day.label}`), {
    headers: icsHeaders(`do-ios-${day.date}.ics`),
  });
};
