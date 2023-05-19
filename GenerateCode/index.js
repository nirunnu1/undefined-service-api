
function GenerateRandom(length) {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
const GenerateCode = ({ length = 6, count = 1, format = "??????" }) => {
  //   const { length, count } = props;
  let code = [];
  while (code.length < count) {
    const _code = GenerateRandom(length);
    if (!code.find((e) => e == _code)) {
      code.push(_code);
    }
  }

  return code.map((e) => {
    let item = format;
    for (let i = 0; i < length; i++) {
      item = item.replace("?", e[i]);
    }
    return item;
  });
};
module.exports = GenerateCode;
