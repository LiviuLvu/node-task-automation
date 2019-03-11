const dotenv = require("dotenv");

dotenv.config();

const addUsers = async (puppeteer, page, userName) => {
  await page
    .hover(".tabs > li:nth-child(11)")
    .catch(() => console.log`ERROR on hover >> .tabs > li:nth-child(11)`);

  await page.waitFor(500);

  await Promise.all([
    page.waitForNavigation(),
    page.click(".tabs > li:nth-child(11) > ul > div > li:nth-child(8)")
  ]).then(
    () => console.log`OK go to users`,
    () =>
      console.log`ERROR on .tabs > li:nth-child(11) > ul > div > li:nth-child(8)`
  );

  await Promise.all([
    page.waitForNavigation(),
    page.click('button[onclick*= "/admin/user/user.cgi?mode=create"]')
  ]).then(
    () => console.log`OK create user form`,
    () =>
      console.log`ERROR on button[onclick*= "/admin/user/user.cgi?mode=create"]`
  );

  await page.waitFor(1000);

  await page.type('input[name="username"]', userName);
  await page.type('input[name="new_password"]', "Admin123");
  await page.type('input[name="new_password2"]', "Admin123");
  await page
    .click("#admin_check")
    .catch(() => console.log`ERROR on checkbox click #admin_check`);

  await page
    .click('input[name="action_add"]')
    .catch(() => console.log`ERROR on checkbox click input[name="action_add"]`);
};

module.exports = addUsers;
