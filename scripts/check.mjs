import { chromium } from "playwright";

const url = process.argv[2] || "http://localhost:5173";
const outDir = "/private/tmp/claude-501/-Users-akinderbueno-Desktop-claude-project/5c9d07f9-b32b-40e4-a18f-b7af97f51f37/scratchpad";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const errors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});
page.on("pageerror", (err) => errors.push(String(err)));

await page.goto(url, { waitUntil: "networkidle" });
await page.waitForSelector("text=Broken Hearted Girls Club", { timeout: 10000 });
await page.waitForTimeout(1500);

await page.screenshot({ path: `${outDir}/01-hero.png` });

// move mouse to trigger glitter cursor
await page.mouse.move(300, 300);
await page.mouse.move(500, 400, { steps: 10 });
await page.mouse.move(700, 500, { steps: 10 });
await page.waitForTimeout(200);
await page.screenshot({ path: `${outDir}/01b-hero-glitter.png` });

const total = await page.evaluate(() => document.body.scrollHeight);

const stops = [0.12, 0.22, 0.32, 0.45, 0.6, 0.75, 0.9, 1];
for (let i = 0; i < stops.length; i++) {
  await page.evaluate((y) => window.scrollTo(0, y), Math.floor(total * stops[i]));
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${outDir}/0${i + 2}-scroll-${Math.round(stops[i] * 100)}.png` });
}

// mobile check
await page.setViewportSize({ width: 390, height: 844 });
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(400);
await page.screenshot({ path: `${outDir}/mobile-hero.png` });

console.log("ERRORS:", JSON.stringify(errors, null, 2));
await browser.close();
