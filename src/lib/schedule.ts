export const TIME_ZONE = "Europe/Amsterdam";
export const VENUE = "NEMO Science Museum, Oosterdok 2, Amsterdam";
export const SITE = "https://do-ios.com";

export const DAY_META = [
  { date: "2026-11-10", label: "Workshops", tab: "Workshops" },
  { date: "2026-11-11", label: "Conference day 1", tab: "Day 1" },
  { date: "2026-11-12", label: "Conference day 2", tab: "Day 2" },
] as const;

const LAST_ITEM_MINUTES: Record<string, number> = {
  Talk: 45,
  Workshop: 45,
  Break: 30,
  Welcome: 15,
  Drinks: 90,
  Dinner: 120,
  Logistics: 15,
};

const ALARM_MINUTES: Record<string, number> = {
  Talk: 10,
  Workshop: 15,
  Welcome: 5,
  Drinks: 15,
  Dinner: 15,
};

export type RawScheduleItem = {
  id: string;
  title: string;
  date: string;
  time: string;
  name?: string;
  image?: string;
  type: string;
  summary?: string;
};

export type ScheduleItem = RawScheduleItem & {
  displayTitle: string;
  endDate: string;
  endTime: string;
  startMs: number;
  endMs: number;
  isoStart: string;
  isoEnd: string;
  tentative: boolean;
};

export type ScheduleSlot = {
  time: string;
  endTime: string;
  startMs: number;
  endMs: number;
  isoStart: string;
  isoEnd: string;
  items: ScheduleItem[];
};

export type ScheduleDay = {
  date: string;
  label: string;
  tab: string;
  heading: string;
  weekday: string;
  weekdayShort: string;
  dayNum: string;
  offset: string;
  slots: ScheduleSlot[];
  items: ScheduleItem[];
};

export function normalizeTime(value: string): string {
  const match = value.trim().match(/^(\d{1,2}):(\d{2})$/);
  if (!match) throw new Error(`Invalid schedule time: ${value}`);
  return `${match[1].padStart(2, "0")}:${match[2]}`;
}

export function displayTitle(title: string): string {
  const trimmed = title.trim();
  if (trimmed.toLowerCase() === "talk") return "To be announced";
  if (trimmed.toLowerCase() === "end") return "Conference ends";
  return trimmed;
}

export function typeLabel(type: string): string {
  if (type === "Logistics") return "Info";
  return type;
}

export function zonedWallTimeToUtc(
  date: string,
  time: string,
  timeZone = TIME_ZONE,
): Date {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const utcGuess = Date.UTC(year, month - 1, day, hour, minute, 0);
  const offset = timeZoneOffset(utcGuess, timeZone);
  let utc = utcGuess - offset;
  const refined = timeZoneOffset(utc, timeZone);
  if (refined !== offset) utc = utcGuess - refined;
  return new Date(utc);
}

function timeZoneOffset(utcMs: number, timeZone: string): number {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).formatToParts(new Date(utcMs));
  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  let hour = Number(map.hour);
  if (hour === 24) hour = 0;
  const asUtc = Date.UTC(
    Number(map.year),
    Number(map.month) - 1,
    Number(map.day),
    hour,
    Number(map.minute),
    Number(map.second),
  );
  return asUtc - utcMs;
}

function addMinutes(date: string, time: string, minutes: number): { date: string; time: string } {
  const [year, month, day] = date.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const shifted = new Date(Date.UTC(year, month - 1, day, hour, minute + minutes));
  const pad = (value: number) => String(value).padStart(2, "0");
  return {
    date: `${shifted.getUTCFullYear()}-${pad(shifted.getUTCMonth() + 1)}-${pad(shifted.getUTCDate())}`,
    time: `${pad(shifted.getUTCHours())}:${pad(shifted.getUTCMinutes())}`,
  };
}

function isoWithOffset(date: string, time: string): string {
  const utc = zonedWallTimeToUtc(date, time);
  const offset = timeZoneOffset(utc.getTime(), TIME_ZONE);
  const sign = offset >= 0 ? "+" : "-";
  const abs = Math.abs(offset);
  const hours = String(Math.floor(abs / 3_600_000)).padStart(2, "0");
  const minutes = String(Math.floor((abs % 3_600_000) / 60_000)).padStart(2, "0");
  return `${date}T${time}:00${sign}${hours}:${minutes}`;
}

function dateParts(date: string) {
  const instant = zonedWallTimeToUtc(date, "12:00");
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIME_ZONE,
    weekday: "long",
    day: "numeric",
    month: "long",
  }).formatToParts(instant);
  const value = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  const weekday = value("weekday");
  return {
    heading: `${weekday} ${value("day")} ${value("month")}`,
    weekday,
    weekdayShort: weekday.slice(0, 3),
    dayNum: value("day"),
  };
}

function isTentative(item: RawScheduleItem): boolean {
  if (item.title.trim().toLowerCase() === "talk") return true;
  return /to be announced/i.test(item.summary ?? "");
}

export function buildSchedule(rawItems: RawScheduleItem[]): ScheduleDay[] {
  const knownDates = new Set<string>(DAY_META.map((day) => day.date));
  const dropped = rawItems.filter((item) => !knownDates.has(item.date));
  if (dropped.length) {
    console.warn(
      `Ignoring schedule items outside Do iOS 2026 days: ${dropped.map((item) => item.id).join(", ")}`,
    );
  }

  return DAY_META.map((meta) => {
    const items = rawItems
      .filter((item) => item.date === meta.date)
      .map((item) => ({ ...item, time: normalizeTime(item.time) }))
      .sort(
        (a, b) =>
          a.time.localeCompare(b.time) ||
          (a.name ?? "").localeCompare(b.name ?? "") ||
          a.title.localeCompare(b.title),
      );

    const starts = [...new Set(items.map((item) => item.time))];
    const scheduled: ScheduleItem[] = items.map((item) => {
      const nextStart = starts[starts.indexOf(item.time) + 1];
      const end = nextStart
        ? { date: item.date, time: nextStart }
        : addMinutes(item.date, item.time, LAST_ITEM_MINUTES[item.type] ?? 45);
      const startMs = zonedWallTimeToUtc(item.date, item.time).getTime();
      const endMs = zonedWallTimeToUtc(end.date, end.time).getTime();
      if (endMs <= startMs) {
        throw new Error(`Schedule item ${item.id} ends at or before it starts`);
      }
      return {
        ...item,
        displayTitle: displayTitle(item.title),
        endDate: end.date,
        endTime: end.time,
        startMs,
        endMs,
        isoStart: isoWithOffset(item.date, item.time),
        isoEnd: isoWithOffset(end.date, end.time),
        tentative: isTentative(item),
      };
    });

    const slots: ScheduleSlot[] = starts.map((time) => {
      const slotItems = scheduled.filter((item) => item.time === time);
      const first = slotItems[0];
      return {
        time,
        endTime: first.endTime,
        startMs: first.startMs,
        endMs: first.endMs,
        isoStart: first.isoStart,
        isoEnd: first.isoEnd,
        items: slotItems,
      };
    });

    const parts = dateParts(meta.date);
    const offset = slots[0]?.isoStart.slice(-6) ?? "+01:00";
    return {
      date: meta.date,
      label: meta.label,
      tab: meta.tab,
      heading: parts.heading,
      weekday: parts.weekday,
      weekdayShort: parts.weekdayShort,
      dayNum: parts.dayNum,
      offset,
      slots,
      items: scheduled,
    };
  }).filter((day) => day.items.length > 0);
}

function icsEscape(value: string): string {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll("\r\n", "\n")
    .replaceAll("\n", "\\n")
    .replaceAll(",", "\\,")
    .replaceAll(";", "\\;");
}

function foldLine(line: string): string {
  const encoder = new TextEncoder();
  const lines: string[] = [];
  let current = "";
  let octets = 0;
  let limit = 75;
  for (const char of line) {
    const size = encoder.encode(char).length;
    if (current && octets + size > limit) {
      lines.push(current);
      current = char;
      octets = size;
      limit = 74;
    } else {
      current += char;
      octets += size;
    }
  }
  if (current) lines.push(current);
  return lines.map((part, index) => (index === 0 ? part : ` ${part}`)).join("\r\n");
}

function icsLocal(date: string, time: string): string {
  return `${date.replaceAll("-", "")}T${time.replace(":", "")}00`;
}

function formatUtcStamp(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getUTCFullYear()}${pad(date.getUTCMonth() + 1)}${pad(date.getUTCDate())}T${pad(date.getUTCHours())}${pad(date.getUTCMinutes())}${pad(date.getUTCSeconds())}Z`;
}

function summaryFor(item: ScheduleItem): string {
  return item.name ? `${item.displayTitle} — ${item.name}` : item.displayTitle;
}

function descriptionFor(item: ScheduleItem): string {
  const lines = [item.summary, item.name, item.type, `${SITE}/now#${item.id}`].filter(
    (line): line is string => Boolean(line),
  );
  return lines.join("\n");
}

const VTIMEZONE = [
  "BEGIN:VTIMEZONE",
  "TZID:Europe/Amsterdam",
  "X-LIC-LOCATION:Europe/Amsterdam",
  "BEGIN:DAYLIGHT",
  "TZOFFSETFROM:+0100",
  "TZOFFSETTO:+0200",
  "TZNAME:CEST",
  "DTSTART:19700329T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU",
  "END:DAYLIGHT",
  "BEGIN:STANDARD",
  "TZOFFSETFROM:+0200",
  "TZOFFSETTO:+0100",
  "TZNAME:CET",
  "DTSTART:19701025T030000",
  "RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU",
  "END:STANDARD",
  "END:VTIMEZONE",
];

function eventLines(item: ScheduleItem, stamp: string): string[] {
  const lines = [
    "BEGIN:VEVENT",
    `UID:${item.id}@do-ios.com`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=Europe/Amsterdam:${icsLocal(item.date, item.time)}`,
    `DTEND;TZID=Europe/Amsterdam:${icsLocal(item.endDate, item.endTime)}`,
    `SUMMARY:${icsEscape(summaryFor(item))}`,
    `DESCRIPTION:${icsEscape(descriptionFor(item))}`,
    `LOCATION:${icsEscape(VENUE)}`,
    `URL:${SITE}/now#${item.id}`,
    `STATUS:${item.tentative ? "TENTATIVE" : "CONFIRMED"}`,
    `TRANSP:${item.type === "Break" || item.type === "Logistics" ? "TRANSPARENT" : "OPAQUE"}`,
    `CATEGORIES:${icsEscape(item.type)}`,
  ];
  const alarm = ALARM_MINUTES[item.type];
  if (alarm) {
    lines.push(
      "BEGIN:VALARM",
      `TRIGGER:-PT${alarm}M`,
      "ACTION:DISPLAY",
      `DESCRIPTION:${icsEscape(summaryFor(item))}`,
      "END:VALARM",
    );
  }
  lines.push("END:VEVENT");
  return lines;
}

export function renderCalendar(days: ScheduleDay[], name: string, stamp = new Date()): string {
  const items = days.flatMap((day) => day.items);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Do iOS//Schedule 2026//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${icsEscape(name)}`,
    "X-WR-TIMEZONE:Europe/Amsterdam",
    ...VTIMEZONE,
    ...items.flatMap((item) => eventLines(item, formatUtcStamp(stamp))),
    "END:VCALENDAR",
  ];
  return `${lines.map(foldLine).join("\r\n")}\r\n`;
}

export function icsHeaders(filename: string): HeadersInit {
  return {
    "Content-Type": "text/calendar; charset=utf-8",
    "Content-Disposition": `inline; filename="${filename}"`,
    "Cache-Control": "public, max-age=300",
    "X-Robots-Tag": "noindex, nofollow",
  };
}
