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

describe("every seminar has a discussion-support deck", () => {
  const sessions = api.nodes.filter((n) => n.type === "sessions");

  it("covers all twelve session nodes", () => {
    expect(sessions).toHaveLength(12);
  });

  it("gives every session a slides: link to a deck that actually built", () => {
    const missing = sessions.filter((n) => typeof n.meta?.slides !== "string").map((n) => n.id);
    expect(missing, `sessions with no slides: link: ${missing.join(", ")}`).toEqual([]);

    for (const session of sessions) {
      const slidesPath = session.meta?.slides as string;
      const deckHtml = resolve("dist", slidesPath.replace(/^\//, ""), "index.html");
      expect(
        () => readFileSync(deckHtml),
        `${session.id} links to ${slidesPath}, but it didn't build`,
      ).not.toThrow();
    }
  });
});
