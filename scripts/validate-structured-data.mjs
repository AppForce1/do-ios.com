import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const distIndex = resolve("dist/index.html");

if (!existsSync(distIndex)) {
  console.error("Run `npm run build` first.");
  process.exit(1);
}

const html = readFileSync(distIndex, "utf8");
const match = html.match(
  /<script type="application\/ld\+json">([\s\S]*?)<\/script>/
);

if (!match) {
  console.error("No Event JSON-LD found in dist/index.html");
  process.exit(1);
}

const schema = JSON.parse(match[1]);
const graph = schema["@graph"] ?? [schema];
const types = graph.map((node) => node["@type"]);
const event = graph.find((node) => node["@type"] === "Event");
const people = graph.filter((node) => node["@type"] === "Person");

console.log("Structured data summary");
console.log(`- Graph nodes: ${graph.length}`);
console.log(`- Types: ${types.join(", ")}`);
console.log(`- Event performers linked: ${event?.performer?.length ?? 0}`);
console.log(`- Person entities: ${people.map((p) => p.name).join(", ")}`);

const requiredEventFields = [
  "name",
  "startDate",
  "endDate",
  "location",
  "organizer",
  "url",
];
const missing = requiredEventFields.filter((field) => !event?.[field]);

if (missing.length) {
  console.error(`Missing Event fields: ${missing.join(", ")}`);
  process.exit(1);
}

console.log("\nLocal checks passed.");
console.log("\nAfter deploy, validate live markup:");
console.log(
  "- Google Rich Results Test: https://search.google.com/test/rich-results?url=https%3A%2F%2Fdo-ios.com%2F"
);
console.log(
  "- Schema.org Validator: https://validator.schema.org/#url=https%3A%2F%2Fdo-ios.com%2F"
);
console.log("\nSubmit sitemap in Google Search Console:");
console.log("- https://search.google.com/search-console");
console.log("- Sitemaps → add: https://do-ios.com/sitemap-index.xml");
