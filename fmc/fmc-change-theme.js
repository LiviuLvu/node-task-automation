const dotenv = require("dotenv");

dotenv.config();

const changeTheme = async (puppeteer, page) => {
  await page.waitForNavigation();

  await page
    .goto("https://u45c01p06-vrouter.cisco.com:15191/ui/user/general")
    .then(
      () => console.log`OK go to theme change`,
      err =>
        console.log`ERROR on theme change >>
        ${err}`
    );

  await page.waitForSelector(".card:first-child .card__content svg");
  await page.click(".card:first-child .card__content svg").catch(
    err =>
      console.log`ERROR on dropdown arrow click >> .card:first-child .card__content svg >>
        ${err}`
  );

  await page.waitFor(500);

  await Promise.all([
    page.waitForNavigation(),
    page.click("#react-select-3-option-1")
  ]).then(
    () => console.log`OK change theme`,
    err => console.log`ERROR on light theme >> #react-select-3-option-1 >> 
    ${err}`
  );
};

module.exports = changeTheme;
