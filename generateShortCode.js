function generateShortCode() {
  let shortCode = "";
  let text = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  for (let i = 0; i < 5; i++) {
    let textArr = text.split("");
    shortCode += textArr[Math.floor(Math.random() * textArr.length)];
  }
  return shortCode;
}

module.exports = generateShortCode;