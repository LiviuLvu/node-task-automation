const dotenv = require("dotenv");

dotenv.config();

const addUsers = async (puppeteer, page, userName) => {
  await page
    .goto(
      "https://u45c01p06-vrouter.cisco.com:15191/admin/user/user.cgi?mode=create"
    )
    .then(
      () => console.log`OK create user ${userName}`,
      err =>
        console.log`ERROR on edit users link >>
        ${err}`
    );
  await page.waitForSelector('input[name="username"]');
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
