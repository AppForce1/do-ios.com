import { getCollection } from "astro:content";
import { buildSchedule, type RawScheduleItem, type ScheduleDay } from "./schedule";

export async function loadSchedule(): Promise<ScheduleDay[]> {
  const entries = await getCollection("agenda");
  const items: RawScheduleItem[] = entries
    .filter((entry) => entry.data.date.startsWith("2026-"))
    .map((entry) => ({
      id: entry.id,
      title: entry.data.title,
      date: entry.data.date,
      time: entry.data.time,
      name: entry.data.name,
      image: entry.data.image,
      type: entry.data.type,
      summary: entry.data.summary,
    }));
  return buildSchedule(items);
}
