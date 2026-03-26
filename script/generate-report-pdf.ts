import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const htmlContent = fs.readFileSync(
  path.join(__dirname, "..", "RK-PLATFORM-REPORT.html"),
  "utf-8"
);

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });
  await page.pdf({
    path: path.join(__dirname, "..", "RK-Platform-Optimization-Report.pdf"),
    format: "A4",
    margin: { top: "0.6in", right: "0.6in", bottom: "0.6in", left: "0.6in" },
    printBackground: true,
  });
  await browser.close();
  console.log("PDF generated: RK-Platform-Optimization-Report.pdf");
})();
