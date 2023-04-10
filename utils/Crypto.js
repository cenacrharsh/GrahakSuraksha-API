// crypto module
const crypto = require("crypto");

const algorithm = "aes-256-cbc";

// generate 16 bytes of random data
const initVector = crypto.randomBytes(16);

// secret key generate 32 bytes of random data
const Securitykey = crypto.randomBytes(32);

//! Encrypt

module.exports.encrypt = function (data) {
  // the cipher function
  const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);

  // encrypt the message
  let encryptedData = cipher.update(data, "utf-8", "hex");

  encryptedData += cipher.final("hex");

  return encryptedData;
};
