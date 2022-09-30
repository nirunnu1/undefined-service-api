const _ = require("lodash");
const crypto = require("crypto");
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
    if (this.IsNullOrEmpty(id)) {
      return "";
    }
    id = this.encrypt(id.toString());
    let buf = new Buffer.from(id, "ascii");
    id = buf.toString("base64");
    return id;
  }

  DecodeKey(id) {
    try {
      if (this.IsNullOrEmpty(id)) {
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
    return this.IsNullOrEmpty(obj) ? (this.IsNullOrEmpty(val) ? "" : val) : obj;
  }
  lodash = _;
}

const service = new Service();
export default service;
