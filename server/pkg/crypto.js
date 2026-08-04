import CryptoJS from "crypto-js";
import { SALT_PASSWORD } from "@/server/utils/_env";

const secret = SALT_PASSWORD;

export const encrypt = (pass) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(pass, secret).toString();
    return encrypted;
  } catch (error) {
    console.log("encrypt : ", error.message);
    return null;
  }
};

export const decrypt = async (cipherText) => {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, secret);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  } catch (error) {
    console.log("decrypt : ", error.message);
    return null;
  }
};

export const validating = async (plain, encrypted) => {
  const dec = decrypt(encrypted);
  return plain === dec;
  try {
  } catch (error) {
    console.log("validating : ", error.message);
  }
};
