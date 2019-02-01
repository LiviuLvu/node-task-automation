// work in progress
// close process when user is completed actions

const dotenv = require("dotenv");
const puppeteer = require("puppeteer");

dotenv.config();

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1200, height: 500 }
  });
  const page = await browser.newPage();
  // const keyboard = page.keyboard;

  await page.goto("https://google.com");

  await page.waitForNavigation({ waitUntil: networkidle2 });

  await page.on("request", request => {
    console.log("Finished pancakes. Kitchen will now close.");
    console.log(request);
  });

  await browser.close();
})();
