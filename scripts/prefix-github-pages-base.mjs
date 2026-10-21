import { readdir, readFile, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";

const TEXT_EXTENSIONS = new Set([".html", ".css", ".js", ".mjs", ".svg", ".xml"]);

// Root-absolute URLs (`/images/...`) ignore a <base> tag, and this site hard-codes
// them. GitHub project Pages serves the site under /<repo>/, so prefix those URLs
// in the Pages build only. Relative URLs and absolute http(s) URLs stay put.
export function prefixRootAbsoluteUrls(text, base) {
  const normalized = normalizeBase(base);
  let result = text.replace(
    /(^|[\s])((?:href|src|action|poster|data-src)=)(["'])\/(?!\/)/gi,
    `$1$2$3${normalized}/`
  );
  result = result.replace(
    /(^|[\s])(srcset=)(["'])([^"']*)\3/gi,
    (_, lead, attr, quote, value) =>
      `${lead}${attr}${quote}${value.replace(/(^|,\s*)\/(?!\/)/g, `$1${normalized}/`)}${quote}`
  );
  result = result.replace(/url\((["']?)\/(?!\/)/gi, `url($1${normalized}/`);
  return result;
}

const GITHUB_PAGES_BANNER = `<div id="github-pages-banner" role="status" style="background:#0a2463;color:#fff;text-align:center;padding:0.75rem 1rem;font:16px/1.45 system-ui,-apple-system,sans-serif;">I temporarily deployed this site to GitHub Pages while my hosting provider is unavailable. The site will be available again at <a href="https://do-ios.com" style="color:#fff;font-weight:700;">https://do-ios.com</a>.</div>`;

export function injectGithubPagesBanner(html) {
  if (html.includes('id="github-pages-banner"')) return html;
  if (!/<body(\s[^>]*)?>/i.test(html)) return html;
  return html.replace(/<body(\s[^>]*)?>/i, `<body$1>${GITHUB_PAGES_BANNER}`);
}

export async function prefixDist(distDir, base) {
  const normalized = normalizeBase(base);
  const files = await walk(distDir);
  let changed = 0;

  for (const file of files) {
    if (!TEXT_EXTENSIONS.has(extname(file).toLowerCase())) continue;
    const original = await readFile(file, "utf8");
    let next = prefixRootAbsoluteUrls(original, normalized);
    if (extname(file).toLowerCase() === ".html") {
      next = injectGithubPagesBanner(next);
    }
    if (next === original) continue;
    await writeFile(file, next);
    changed += 1;
  }

  console.log(
    `Prefixed root-absolute URLs in ${changed} files with base ${normalized}`
  );
  return changed;
}

function normalizeBase(base) {
  const trimmed = String(base ?? "").trim();
  if (!trimmed || trimmed === "/") {
    throw new Error("GITHUB_PAGES_BASE must be a path like /do-ios.com");
  }
  const withSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withSlash.replace(/\/+$/, "");
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else if (entry.isFile()) files.push(path);
  }
  return files;
}

if (process.argv[1]?.endsWith("prefix-github-pages-base.mjs")) {
  const distDir = process.argv[2];
  const base = process.argv[3];
  if (!distDir || !base) {
    console.error(
      "Usage: node scripts/prefix-github-pages-base.mjs <dist-dir> <base>"
    );
    process.exit(1);
  }
  await prefixDist(distDir, base);
}
