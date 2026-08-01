#!/usr/bin/env node
import { readFileSync, appendFileSync } from "node:fs";

const reportPath = process.env.REPORT_FILE ?? "e2e-results.json";
const lines = ["## Playwright E2E results"];

let report;
try {
  report = JSON.parse(readFileSync(reportPath, "utf8"));
} catch {
  lines.push("");
  lines.push(`:x: Could not read \`${reportPath}\` — did the E2E suite run?`);
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, lines.join("\n") + "\n");
  } else {
    console.log(lines.join("\n"));
  }
  process.exit(0);
}

const { expected = 0, unexpected = 0, flaky = 0, skipped = 0, duration = 0 } =
  report.stats ?? {};

const failures = [];
function walk(suite, path) {
  for (const child of suite.suites ?? []) walk(child, path + child.title + " > ");
  for (const spec of suite.specs ?? []) {
    const status = spec.tests?.[0]?.results?.[0]?.status;
    if (status === "failed" || status === "timedOut" || status === "interrupted") {
      failures.push(path + spec.title);
    }
  }
}
for (const suite of report.suites ?? []) walk(suite, "");

lines.push("");
lines.push(`- :white_check_mark: Passed: **${expected}**`);
lines.push(`- :x: Failed: **${unexpected}**`);
lines.push(`- :cyclone: Flaky: **${flaky}**`);
lines.push(`- :fast_forward: Skipped: **${skipped}**`);
lines.push(`- :stopwatch: Duration: **${(duration / 1000).toFixed(1)}s**`);
if (failures.length > 0) {
  lines.push("");
  lines.push("### Failed tests");
  for (const f of failures) lines.push(`- \`${f}\``);
}

if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, lines.join("\n") + "\n");
} else {
  console.log(lines.join("\n"));
}
