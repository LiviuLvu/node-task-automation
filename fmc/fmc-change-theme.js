const dotenv = require("dotenv");

dotenv.config();

const changeTheme = async (puppeteer, page) => {
  await page.waitForNavigation();

  await page.hover(".eyebrow.tab.user").catch(
    err => console.log`ERROR on hover >> .eyebrow.tab.user >> 
    ${err}`
  );

  await page.waitFor(500);

  await Promise.all([
    page.waitForNavigation(),
    page.click('.flyout-item a[href*="/ui/user/general"]')
  ]).then(
    () => console.log`OK go to user color settings`,
    err =>
      console.log`ERROR on .flyout-item a[href*="/ui/user/general"] >> 
      ${err}`
  );

  await page
    .click(".card:first-child .card__content svg")
    .catch(
      () =>
        console.log`ERROR on dropdown arrow click >> .card:first-child .card__content svg`
    );

  await page.waitFor(500);

  await Promise.all([
    page.waitForNavigation(),
    page.click("#react-select-3-option-1")
  ]).then(
    () => console.log`OK change theme`,
    () => console.log`ERROR on light theme >> #react-select-3-option-1`
  );
};

module.exports = changeTheme;
