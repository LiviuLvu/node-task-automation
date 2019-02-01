// work in progress

const dotenv = require("dotenv");
const puppeteer = require("puppeteer");

dotenv.config();

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto("https://feedly.com/");

  // login section
  await page.click("button.button-login.secondary");
  await browser.on("targetcreated", async () => {
    const pageList = await browser.pages();
    const loginPage = await pageList[pageList.length - 1];

    await loginPage.waitForSelector(`a.button.primary.feedly`);
    await loginPage.click("a.button.primary.feedly");

    await loginPage.waitForSelector(`input.input-text.input-top`);
    await loginPage.type("input.input-text.input-top", process.env.FEEDLY_M);
    await loginPage.type("input.input-text.input-bottom", process.env.FEEDLY_P);
    await loginPage.click('input[type="submit"]');
  });

  await page.screenshot({
    path: "screenshot.png"
  });

  await browser.on("targetdestroyed", async () => {
    await page.waitForNavigation({ waitUntil: "networkidle2" }); // url ends with .../latest

    // const selected2 = await page.evaluate(async () => {
    //   await document.querySelector("#feedlyPageFX");
    // });

    const elementSelectionTest = await page.$("#feedlyPageFX");
    console.log("? >> " + elementSelectionTest); // JSHandle@node ??? wtf is this?

    await page.focus("#feedlyPageFX");

    const pageTest = await page.target();
    // const pageTestProps = Object.assign({}, pageTest);
    // console.log(pageTestProps);
    console.log(pageTest._targetInfo);

    await page.keyboard.press("End");
    await page.evaluate(() => {
      window.scrollBy(0, 10);
      // const scrolldelay = setTimeout("pageScroll()", 100);
    });

    // await page.waitForSelector("button.giant-mark-as-read");
    // await page.keyboard.up("End");

    // await browser.close();
  });
})();
