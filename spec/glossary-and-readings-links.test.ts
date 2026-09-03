import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
}

interface CourseApi {
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;

// The real entries in a built list page are the anchors on its `<dl>` items,
// not every `id` on the page (nav landmarks like #main and #at-nav-menu are
// not glossary or reading entries).
const idsOf = (htmlPath: string): Set<string> => {
  const html = readFileSync(resolve(htmlPath), "utf8");
  return new Set(Array.from(html.matchAll(/<div id="([a-z0-9-]+)"/g), (m) => m[1]));
};

const glossaryIds = idsOf("dist/glossary/index.html");
const readingIds = idsOf("dist/readings/index.html");

const weekSlugs = api.nodes
  .filter((n) => n.type === "sessions")
  .map((n) => n.id.replace(/^sessions\//, ""));

describe("every week links the glossary and the readings list", () => {
  it("found all twelve week pages to check", () => {
    expect(weekSlugs.length).toBe(12);
  });

  it("has a non-empty glossary and readings list to link into", () => {
    expect(glossaryIds.size).toBeGreaterThan(0);
    expect(readingIds.size).toBeGreaterThan(0);
  });

  it.each(weekSlugs)("%s links at least one real glossary entry", (slug) => {
    const html = readFileSync(resolve(`dist/sessions/${slug}/index.html`), "utf8");
    const linked = Array.from(html.matchAll(/href="[^"]*\/glossary\/#([a-z0-9-]+)"/g), (m) => m[1]);
    expect(linked.length, `${slug} has no #anchor link into the glossary`).toBeGreaterThan(0);
    for (const id of linked) {
      expect(glossaryIds.has(id), `${slug} links glossary/#${id}, which isn't a real entry`).toBe(true);
    }
  });

  it.each(weekSlugs)("%s links at least one real reading", (slug) => {
    const html = readFileSync(resolve(`dist/sessions/${slug}/index.html`), "utf8");
    const linked = Array.from(html.matchAll(/href="[^"]*\/readings\/#([a-z0-9-]+)"/g), (m) => m[1]);
    expect(linked.length, `${slug} has no #anchor link into the readings list`).toBeGreaterThan(0);
    for (const id of linked) {
      expect(readingIds.has(id), `${slug} links readings/#${id}, which isn't a real entry`).toBe(true);
    }
  });
});
