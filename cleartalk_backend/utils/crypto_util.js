import dotenv from "dotenv";
import CryptoJS from "crypto-js";
dotenv.config({
  path: "./.env",
});

export const SECRET_KEY = process.env.ENCRYPTION_SECRET_KEY;

export const encryptMessage = (message) => {
  return CryptoJS.AES.encrypt(message, SECRET_KEY).toString();
};

export const decryptMessage = (message) => {
  const bytes = CryptoJS.AES.decrypt(message, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
