const dotenv = require("dotenv");
const puppeteer = require("puppeteer");

dotenv.config();

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();

  await page.goto("https://www.myworkday.com/3pillar/d/home.htmld");

  // login
  await page.type("input#Email", process.env.NS_M);
  await Promise.all([page.waitForNavigation(), page.click("input#next")]);
  await page.type("input#Passwd", process.env.MW_P);
  await Promise.all([page.waitForNavigation(), page.click("input#signIn")]);

  await page.waitForNavigation({
    waitUntil: ["domcontentloaded"]
  });
  await page.waitFor(".wd-applet.wd-applet-time-off");

  // navigate
  await Promise.all([
    page.waitForNavigation(),
    page.click(".wd-applet.wd-applet-time-off")
  ]);
  await Promise.all([
    page.waitForNavigation(),
    page.click(
      'div > div:first-child> [data-automation-id="workletQuandrant"] div[id*="wd-GroupedList-NO_METADATA_"] ul li:first-child '
    )
  ]);

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
})();
