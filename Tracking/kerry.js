const puppeteer = require("puppeteer");
const axios = require("axios");
const delay = (time) => {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  };

const kerry = async (track) => {
  try {
    let data;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://th.kerryexpress.com/en/track/");
    let ell = await page.waitForSelector("input[type=text]");
    let el = await page.click("input[type=text]");
    await delay(1000);
    for (let i = 0; i < track.length; i++) {
      await page.keyboard.press(track[i]);
    }
    await delay(1000);
    await page.keyboard.press("Enter");
    await delay(1000);
    await axios
      .post(page.url())
      .then(function (response) {
        data = response.data;
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
    return data;
  } catch (e) {
    console.warn(e)
    return e;
  }
};

module.exports = kerry;