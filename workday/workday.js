const dotenv = require("dotenv");
const puppeteer = require("puppeteer");

dotenv.config();

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1200, height: 1600 }
  });
  const page = await browser.newPage();
  const keyboard = page.keyboard;

  await page.goto("https://www.myworkday.com/3pillar/d/task/2997$275.htmld");

  await page.type("input#Email", process.env.NS_M);
  await Promise.all([page.waitForNavigation(), page.click("input#next")]);
  await page.type("input#Passwd", process.env.MW_P);
  await Promise.all([page.waitForNavigation(), page.click("input#signIn")]);

  await page.waitForNavigation({ waitUntil: "load" });
  await page.waitFor("td.dayCell-today");
  await page.click("td.dayCell-today");

  // the request time off button is not in view
  await page.waitFor(1000);
  await page.evaluate(async () => {
    await window.scrollBy(0, window.innerHeight);
  });

  await page.waitFor(
    '[data-automation-id="wd-CommandButton_calendarSubmitButton"]'
  );

  await page.click(
    '[data-automation-id="wd-CommandButton_calendarSubmitButton"]'
  );

  await page.waitFor('[data-automation-id="promptIcon"]');
  await page.click('[data-automation-id="promptIcon"]');

  await page.waitFor('[data-automation-label="ROU-2-Work From Home"]');
  await page.click('[data-automation-label="ROU-2-Work From Home"]');

  await page.waitFor(
    '[data-automation-id="formLabelRequired"]:nth-child(5) span[data-automation-id="promptIcon"]'
  );
  await page.click(
    '[data-automation-id="formLabelRequired"]:nth-child(5) span[data-automation-id="promptIcon"]'
  );

  await page.waitFor('[data-automation-id="radioBtn"]');
  await page.click('[data-automation-id="radioBtn"]');

  // submit button
  // await page.click('[data-automation-id="wd-CommandButton_934$20_BPF_Button_Bar"]');
})();
