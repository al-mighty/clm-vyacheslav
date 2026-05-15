import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.goto('file://' + path.resolve(__dirname, 'og-card.html'));
  await page.waitForTimeout(1000); // let fonts load
  await page.screenshot({
    path: path.resolve(__dirname, '..', 'public', 'og-image.jpg'),
    type: 'jpeg',
    quality: 90,
  });
  await browser.close();
  console.log('OG image saved to public/og-image.jpg');
})();
