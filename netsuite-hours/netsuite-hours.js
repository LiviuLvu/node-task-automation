const dotenv = require("dotenv");
const puppeteer = require("puppeteer");

dotenv.config();

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1200, height: 500 }
  });
  const page = await browser.newPage();
  const keyboard = page.keyboard;

  await page.goto(process.env.NS_TIMESHEET);

  // login
  await page.type('input[name="email"]', process.env.NS_M);
  await page.type('input[name="password"]', process.env.NS_P);
  await Promise.all([page.waitForNavigation(), page.click("input.bgbutton")]);

  // answer security question
  await page.type('input[name="answer"]', process.env.NS_Q2);
  await Promise.all([
    page.waitForNavigation(),
    page.click('input[name="submitter"]')
  ]);

  // go to weekly hours
  await page.goto(process.env.NS_LINK);

  // client
  await page.type("#timegrid_customer_display", process.env.CLIENT);

  // task
  await page.click(
    ".uir-machine-row-focused > .listinlinefocusedrow:nth-child(2)"
  );
  await page.waitFor(900);
  await page.type("#inpt_casetaskevent1", process.env.TASK);

  // Software Engineer II - Offshore
  await page.waitFor(900);
  await page.click(
    ".uir-machine-row-focused > .listinlinefocusedrow:nth-child(3)"
  );
  await page.waitFor(900);
  await page.waitFor("#inpt_casetaskevent1");
  await page.type("#inpt_casetaskevent1", process.env.SERVICE_ITEM);
  await page.waitFor("#inpt_item2_arrow");
  await page.click("#inpt_item2_arrow");
  await keyboard.press("Tab");

  // billable checkbox
  await page.waitFor("#timegrid_isbillable_fs_inp");
  await page.click("#timegrid_isbillable_fs_inp");

  // check page status
  const totalWeekHours = await page.evaluate(
    // usually is 0:00
    () =>
      document.querySelector("#totalhours_fs span#totalhours_val").textContent
  );
  if (totalWeekHours !== "0:00") {
    console.log("Stop! There are hours currently logged. Enter time manually");
    return;
  }
  console.log(
    "totalWeekHours is >>> " +
      totalWeekHours +
      " Autocompleting hours. Please check and submit form."
  );

  await page.click(
    ".uir-machine-row-focused > .listinlinefocusedrow:nth-child(11)"
  );

  const enterHours = async (day = 1) => {
    await page.type("#timeentry_hours_1", "8");
    await keyboard.press("Tab");

    day = day + 1;

    if (day < 6) {
      enterHours(day);
    }
  };

  await enterHours();
})();
