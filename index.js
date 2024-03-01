const generateCode = require("./GenerateCode");
const tracking = require("./Tracking");
const xl = require("excel4node");
const _ = require("lodash");
const moment = require("moment");
function formatBuddhist(date, format) {
  console.log("this", this)
  const _m = moment(date)
  var christianYear = _m.format('YYYY')
  var buddhishYear = (parseInt(christianYear) + 543).toString()
  if (service.isNullOrEmpty(format)) {
    return new Date(_m)
  } else {
    return _m
      .format(format.replace('YYYY', buddhishYear).replace('YY', buddhishYear.substring(2, 4))
        .replace('yyyy', buddhishYear).replace('yy', buddhishYear.substring(2, 4)))
      .replace(christianYear, buddhishYear)
  }
}
moment.fn.formatBuddhist = formatBuddhist
moment.prototype.formatBuddhist = formatBuddhist

const crypto = require("crypto");
// (async () => {
//   let tracking1 = await tracking.flash("TH471352SMN43");
//   console.log(tracking1);
//   tracking1 = await tracking.flash("TH471352SMN43A");
//   console.log(tracking1);
// })();

const isNullOrEmpty = (obj) => {
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
};

const decrypt = (encrypted) => {
  let decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    process.env.ENC_KEY,
    process.env.IV
  );
  let decrypted = decipher.update(encrypted, "base64", "utf8");
  return decrypted + decipher.final("utf8");
};

const ENC_KEY = "bf3c199c2470cb477d907b1e0917c17b";
const IV = "5183666c72eec9e4";
const encrypt = (val) => {
  let cipher = crypto.createCipheriv(
    "aes-256-cbc",
    process.env.ENC_KEY || ENC_KEY,
    process.env.IV || IV
  );
  let encrypted = cipher.update(val, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
};
const EncodeKey = (item) => {
  let id = item;
  if (isNullOrEmpty(id)) {
    return "";
  }
  id = encrypt(id.toString());
  let buf = new Buffer.from(id, "ascii");
  id = buf.toString("base64");
  return id;
};
const GenerateCode = ({
  encrypt = true,
  length = 6,
  count = 1,
  format = "??????",
  excel = false,
}) => {
  const code = generateCode({
    encrypt: encrypt,
    length: length,
    count: count,
    format: format,
  });
  // console.log(code);
  const _EncodeKey = code.map((e) => {
    return EncodeKey(e);
  });
  if (excel) {
    let wb = new xl.Workbook();
    let ws = wb.addWorksheet("Code");
    code.map((e, i) => {
      ws.cell(i + 1, 1).string(code[i]);
    });
    return { code, encrypt: _EncodeKey, excel: wb };
  } else {
    return { code, encrypt: _EncodeKey };
  }
};

class Service {
  constructor(options) {
    this._options = options;
  }
  /**
   * Returns true ถ้าไม่เท่ากับ undefined '' "" null
   * @param obj  string int list
   */
  isNullOrEmpty = isNullOrEmpty;
  encrypt = encrypt;

  decrypt = decrypt;

  EncodeKey = EncodeKey;

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
  track = tracking;
  GenerateCode = GenerateCode;
  moment = moment
}

const service = new Service();
module.exports = service;
