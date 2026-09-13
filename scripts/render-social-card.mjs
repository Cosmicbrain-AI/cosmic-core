import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Render a new HTML composition. Source photography and the company logo remain unchanged.
// Use the workspace's Playwright package, or point COSMICBRAIN_NODE_MODULES at a bundled runtime.
const packageRoot = process.env.COSMICBRAIN_NODE_MODULES;
const require = createRequire(packageRoot ? resolve(packageRoot, "package.json") : import.meta.url);
const { chromium } = require("playwright");
const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = resolve(projectRoot, "public/social/cosmicbrain-robotics-v4.html");
const output = resolve(projectRoot, "public/social/cosmicbrain-robotics-v4.png");
const browser = await chromium.launch({
  headless: true,
  ...(process.env.COSMICBRAIN_CHROME ? { executablePath: process.env.COSMICBRAIN_CHROME } : {}),
});

try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  });
  await page.goto(pathToFileURL(source).href, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(Array.from(document.images, (image) => image.decode()));
    for (const font of ['82px "Instrument Serif"', '37px "DM Sans"', '11px "DM Mono"']) {
      if (!document.fonts.check(font)) throw new Error(`Required font did not load: ${font}`);
    }
  });
  await page.screenshot({ path: output, type: "png" });
  console.log(`Rendered 1200 × 630 social card: ${output}`);
} finally {
  await browser.close();
}
