import CryptoJS from "crypto-js";

const SECRET_KEY = "a3b74d2cf7e9089452ce17499d407131";

export const encryptMessage = (message) => {
  return CryptoJS.AES.encrypt(message, SECRET_KEY).toString();
};

export const decryptMessage = (message) => {
  const bytes = CryptoJS.AES.decrypt(message, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
