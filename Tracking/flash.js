//  https://flashexpress.com/fle/tracking
const puppeteer = require("puppeteer");
const axios = require("axios");
const delay = (time) => {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
};

const flash = async (track) => {
    try {
        let data;
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto("https://flashexpress.com/fle/tracking");
        let ell = await page.waitForSelector(".el-input__inner");
        let el = await page.click(".el-input__inner");
        await delay(300);
        for (let i = 0; i < track.length; i++) {
            await page.keyboard.press(track[i]);
        }
        await delay(200);
        await page.keyboard.press("Enter");
        await delay(200);

        const trackno = await page.evaluate(() =>
            Array.from(document.querySelectorAll(".information"), (element) => {
                return element.textContent;
            })
        );
        let item = []
        trackno.map(e => {
            let _e = e.replaceAll("  ", "")
            _e = _e.split(" ")
            item.push({
                date: _e[0],
                time: _e[1],
                status: _e[2],
            })
        })
        const no = await page.evaluate(() =>
            Array.from(document.querySelectorAll(".c-l-no"), (element) => {
                return element.textContent;
            })
        );
        return {
            track: track,
            trackno: no[0],
            item,
        };
    } catch (e) {
        console.warn(e);
        return e;
    }
};

module.exports = flash;
