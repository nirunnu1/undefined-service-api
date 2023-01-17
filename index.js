const _ = require("lodash");
const puppeteer = require("puppeteer");
const axios = require("axios");
const crypto = require("crypto");
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
    return e;
  }
};
const thailandpost = async (track) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data;
      await axios
        .post(
          "https://international.thailandpost.com/wp-content/themes/thaipost/tracking.php?action=callapi&language=TH&barcode=" +
            track
        )
        .then(function (response) {
          // handle success
          data = response.data;
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
      return resolve(data);
    } catch (e) {
      return reject(e);
    }
  });
};
const track = {
  thailandpost: thailandpost,
  kerry: kerry,
};
class Service {
  constructor(options) {
    this._options = options;
  }
  /**
   * Returns true ถ้าไม่เท่ากับ undefined '' "" null
   * @param obj  string int list
   */
  isNullOrEmpty(obj) {
    if ("undefined" === typeof obj || obj == null) {
      return true;
    } else if (
      typeof obj != "undefined" &&
      obj != null &&
      obj.length !== null &&
      obj.length === 0
    ) {
      return true; //array
    } else if ("number" === typeof obj) {
      return obj !== obj; //NaN

      // return false;
    } else if ("string" === typeof obj) {
      return obj.length < 1 ? true : false;
    } else {
      return false;
    }
  }
  encrypt = (val) => {
    let cipher = crypto.createCipheriv(
      "aes-256-cbc",
      process.env.ENC_KEY,
      process.env.IV
    );
    let encrypted = cipher.update(val, "utf8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
  };

  decrypt = (encrypted) => {
    let decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      process.env.ENC_KEY,
      process.env.IV
    );
    let decrypted = decipher.update(encrypted, "base64", "utf8");
    return decrypted + decipher.final("utf8");
  };

  EncodeKey(id) {
    if (this.isNullOrEmpty(id)) {
      return "";
    }
    id = this.encrypt(id.toString());
    let buf = new Buffer.from(id, "ascii");
    id = buf.toString("base64");
    return id;
  }

  DecodeKey(id) {
    try {
      if (this.isNullOrEmpty(id)) {
        return "";
      }
      let buff = new Buffer.from(id, "base64");
      // console.log(buff)
      id = buff.toString("ascii");
      return this.decrypt(id);
    } catch {
      return id;
    }
  }
  IsNull(obj, val) {
    return this.isNullOrEmpty(obj) ? (this.isNullOrEmpty(val) ? "" : val) : obj;
  }
  lodash = _;
  resultSucceed(obj) {
    return { status: true, ...obj };
  }
  resultFailed(obj) {
    return { status: false, ...obj };
  }
  track = track;
}

const service = new Service();
module.exports = service;
