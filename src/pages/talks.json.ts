import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async () => {
  const allTalks = await getCollection("agenda");
  const payload = allTalks.map((talk) => ({
    title: talk.data.title,
    description: talk.data.title,
    slug: talk.id,
  }));

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "X-Robots-Tag": "noindex, nofollow",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
