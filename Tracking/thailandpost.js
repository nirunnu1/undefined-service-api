const axios = require("axios");
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
module.exports = thailandpost;
