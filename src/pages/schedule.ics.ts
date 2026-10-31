import type { APIRoute } from "astro";
import { loadSchedule } from "../lib/load-schedule";
import { icsHeaders, renderCalendar } from "../lib/schedule";

export const GET: APIRoute = async () => {
  const days = await loadSchedule();
  return new Response(renderCalendar(days, "Do iOS 2026"), {
    headers: icsHeaders("do-ios-2026.ics"),
  });
};
