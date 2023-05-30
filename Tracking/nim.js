//  https://www.nimexpress.com/web/p/tracking
const puppeteer = require("puppeteer");
const axios = require("axios");
const delay = (time) => {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
};

const nim = async (track) => {
  try {
    let data;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.nimexpress.com/web/p/tracking");
    let ell = await page.waitForSelector("#i-selectized");
    let el = await page.click("#i-selectized");
    await delay(1000);
    for (let i = 0; i < track.length; i++) {
      await page.keyboard.press(track[i]);
    }
    await delay(1000);
    await page.keyboard.press("Enter");
    await delay(1000);

    const trackno = await page.evaluate(() =>
      Array.from(document.querySelectorAll("h2.text-center"), (element) => {
        return element.textContent;
      })
    );
    const item = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll("#showTrack li .stacked-text"),
        (element) => {
          let date = "";
          let status = "";
          try {
            date = element.children[0].textContent;
          } catch {}
          try {
            status = element.children[1].textContent
              .replaceAll("\t", "")
              .replaceAll("\n", "")
              .replaceAll("  ", "")
              .trim();
          } catch {}
          return {
            date: date,
            text: status,
          };
        }
      )
    );

    return {
      trackno: trackno[0],
      item,
    };
  } catch (e) {
    console.warn(e);
    return e;
  }
};

module.exports = nim;
