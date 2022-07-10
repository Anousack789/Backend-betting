const crypto = require('crypto');
const config = require('../../config');
const algorithm = 'aes-256-cbc';
const key = config.serverKey;
const iv = config.iv;
const myCrypto = {
  encrypt: (text) => {
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  },
  decrypt: (text) => {
    let decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  },
};
module.exports = myCrypto;
