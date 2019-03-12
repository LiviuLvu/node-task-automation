const puppeteer = require("puppeteer");

const login = require("./fmc-login");
const changeTheme = require("./fmc-change-theme");
const addUsers = require("./fmc-add-users");

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1200, height: 1200 },
    // ignore the self signed certificate warning
    ignoreHTTPSErrors: true
  });
  const page = await browser.newPage();

  await login(puppeteer, page);

  //"paula", "ana", "edi", "liviu", "sorin", "paul", "andreea", "ramona", "mihai", "mikyC", "mikyF", "mikyIE", "raduC", "raduF", "raduIE"
  const users = ["d", "e", "f", "g"];
  for (let userName in users) {
    await addUsers(puppeteer, page, users[userName]);
    userName + 1 < users.length ? await page.waitForNavigation() : null;
  }
  page.waitFor(1000);
  await page.screenshot({ path: "allusers.png" });

  await changeTheme(puppeteer, page);
  await page.screenshot({ path: "themechange.png" });
})();
