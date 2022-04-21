// create shorten code
function generateShortCode () {
  let shortCode = ''
  const text = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
  for (let i = 0; i < 5; i++) {
    const textArr = text.split('')
    shortCode += textArr[Math.floor(Math.random() * textArr.length)]
  }
  return shortCode
}

module.exports = generateShortCode
