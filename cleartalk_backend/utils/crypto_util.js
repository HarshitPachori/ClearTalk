import CryptoJS from "crypto-js";
import { SECRET_KEY } from "../server.js";

export const encryptMessage = (message) => {
  return CryptoJS.AES.encrypt(message, SECRET_KEY).toString();
};

export const decryptMessage = (message) => {
  const bytes = CryptoJS.AES.decrypt(message, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
