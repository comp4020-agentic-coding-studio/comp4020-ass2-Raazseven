import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

interface ApiNode {
  id: string;
  type: string;
  meta?: Record<string, unknown>;
}

interface CourseApi {
  course: { code: string };
  nodes: ApiNode[];
}

const api = JSON.parse(readFileSync(resolve("dist/api/index.json"), "utf8")) as CourseApi;
const weeksOf = (types: string[]) =>
  api.nodes.filter((n) => types.includes(n.type)).map((n) => n.meta?.week as number);

describe("assignment-2 spec", () => {
  it("keeps the three digits the repo was provisioned with in the SLOP code", () => {
    expect(api.course.code.slice(-3)).toBe("119");
  });

  it("runs across all twelve dated teaching weeks", () => {
    const covered = new Set(weeksOf(["sessions", "lectures"]));
    const missing = Array.from({ length: 12 }, (_, i) => i + 1).filter((w) => !covered.has(w));
    expect(missing, `weeks with no session or lecture: ${missing.join(", ")}`).toEqual([]);
  });

  it("has at least one lecture linking to a deck that actually built", () => {
    const lecturesWithSlides = api.nodes.filter(
      (n) => n.type === "lectures" && typeof n.meta?.slides === "string",
    );
    expect(lecturesWithSlides.length, "no lecture has a slides: link to a deck").toBeGreaterThan(0);

    for (const lecture of lecturesWithSlides) {
      const slidesPath = lecture.meta?.slides as string;
      const deckHtml = resolve("dist", slidesPath.replace(/^\//, ""), "index.html");
      expect(() => readFileSync(deckHtml), `${lecture.id} links to ${slidesPath}, but it didn't build`).not.toThrow();
    }
  });

  it("adds assessment weights up to 100%", () => {
    const total = api.nodes
      .filter((n) => n.type === "assessments")
      .reduce((sum, n) => sum + (n.meta?.weight as number), 0);
    expect(total).toBe(100);
  });
});
