const dotenv = require("dotenv");

dotenv.config();

const login = async (puppeteer, page) => {
  await page.goto("https://u45c01p06-vrouter.cisco.com:15191", { timeout: 0 });

  // login
  await page.type("#username", process.env.FMC_U);
  await page.type("#password", process.env.FMC_P);

  await Promise.all([
    page.waitForNavigation({ timeout: 0 }),
    page.click("#login_button")
  ]);

  // confirm login if prompted
  await Promise.all([
    page.waitForNavigation(),
    page.click(".buttons .primary")
  ]).then(
    () => console.log`OK confirm login`,
    err => console.log`ERROR on confirm login >> 
    ${err}`
  );
};

module.exports = login;
