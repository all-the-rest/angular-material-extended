// Generic manifest-driven screenshot spec for the ui-review skill.
//
// Static Single-Page-Website: kein Auth, keine Seeds, keine UI-Navigation —
// jede Route wird per Direkt-URL geladen (gerechtfertigt: keine Navigations-
// Pfade, die durchgeklickt werden müssten).
//
// SECTION-CAPTURES: Full-Page-PNGs werden für den Vision-Model auf ~2000 px
// herunterskaliert — bei langen Seiten sind Bereiche unterhalb des Folds dann
// unlesbar (Regression: abgeschnittenes Badge in der Datenschutz-Tabelle unten).
// Deshalb wird die gesamte Seite zusätzlich in Viewport-Höhen-Sektionen erfasst
// (Scroll-Schritte à 80 % der Viewport-Höhe → 20 % Überlappung, kein Lücke).
//
// Alle Tests sind getaggt, damit die Gruppe klar von funktionalen E2E-Tests
// getrennt bleibt. Diese Spec assertiert NICHTS — sie hält nur Pixels fest.
import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";
import path from "node:path";
import process from "node:process";
import { routes, uiReviewConfig } from "./ui-review.config";
import type { UiReviewState, UiReviewViewport } from "./ui-review.config";

const out = (state: UiReviewState, viewport: UiReviewViewport, file: string) =>
  path.resolve(process.cwd(), uiReviewConfig.outputDir, state, viewport, file);

function viewportForProject(projectName: string): UiReviewViewport {
  return projectName === "Mobile Chrome" ? "mobile" : "desktop";
}

async function waitForAppSettled(page: Page, expectedTitle: string): Promise<void> {
  await page.waitForLoadState("networkidle");
  await expect(page.getByRole("main")).toBeVisible();
  // Guard: stellt sicher, dass wirklich diese App gerendert wird und nicht ein
  // fremder Dev-Server, der zufällig den Port belegt (verhindert stille Fehl-Captures).
  await expect(page).toHaveTitle(expectedTitle);
  await page.waitForTimeout(300);
}

/**
 * Erfasst die ganze Seite in lesbaren Viewport-Höhen-Sektionen (80 % Schritt,
 * 20 % Überlappung). Erkennt den echten Scroll-Container: bevorzugt das Window
 * (document.scrollingElement); scrollt die App aber in einem INNEREN Container
 * (hier: <main class="…overflow-auto">, 100vh-Layout), wird genau der gescrollt —
 * sonst würden lange Seiten nur als erster Viewport (sec0) erfasst.
 */
async function captureSections(
  page: Page,
  state: UiReviewState,
  viewport: UiReviewViewport,
  name: string,
): Promise<void> {
  const scroller = await page.evaluate(() => {
    const doc = document.scrollingElement;
    const winH = window.innerHeight;
    if (doc && doc.scrollHeight > winH + 4) {
      return { kind: "window", max: doc.scrollHeight - winH, step: Math.round(winH * 0.8) };
    }
    const main = document.querySelector("main");
    if (main && main.scrollHeight > main.clientHeight + 4) {
      return { kind: "main", max: main.scrollHeight - main.clientHeight, step: Math.round(main.clientHeight * 0.8) };
    }
    return { kind: "window", max: 0, step: Math.round(winH * 0.8) };
  });
  const scroll = (y: number) =>
    page.evaluate(
      ({ kind, y }) => {
        if (kind === "main") {
          const el = document.querySelector("main");
          if (el) el.scrollTop = y;
        } else {
          window.scrollTo(0, y);
        }
      },
      { kind: scroller.kind, y }
    );
  let y = 0;
  let i = 0;
  for (;;) {
    await scroll(y);
    await page.waitForTimeout(150);
    await page.screenshot({ path: out(state, viewport, `${name}-sec${i}.png`), fullPage: false });
    if (y >= scroller.max) break;
    i += 1;
    y = Math.min(scroller.max, y + scroller.step);
  }
  await scroll(0);
}

for (const route of routes) {
  for (const state of route.states) {
    for (const viewport of route.viewports ?? ["desktop", "mobile"]) {
      test(`screenshot ${route.name} (${state}, ${viewport})`, { tag: ["@screenshot"] }, async ({ page }, testInfo) => {
        test.skip(
          viewportForProject(testInfo.project.name) !== viewport,
          `project ${testInfo.project.name} renders the ${viewportForProject(testInfo.project.name)} viewport`,
        );
        await page.goto(route.path);
        await waitForAppSettled(page, route.expectedTitle);
        // page.screenshot resolves relative paths against process.cwd(), not
        // the config outputDir — build the absolute path explicitly.
        await page.screenshot({ path: out(state, viewport, `${route.name}.png`), fullPage: true });
        await captureSections(page, state, viewport, route.name);
      });
    }
  }
}
