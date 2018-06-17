import * as crypto from "crypto";

export default class Crypto {
  public static algorithm = "aes-256-ctr";

  public static encrypt(text: string, password: string) {
    const cipher = crypto.createCipher(Crypto.algorithm, password);
    let crypted = cipher.update(text, "utf8", "hex");
    crypted += cipher.final("hex");
    return crypted;
  }

  public static decrypt(text: string, password: string) {
    const decipher = crypto.createDecipher(Crypto.algorithm, password);
    let dec = decipher.update(text, "hex", "utf8");
    dec += decipher.final("utf8");
    return dec;
  }

  public static createHash(text: string) {
    return crypto
      .createHash("md5")
      .update(text)
      .digest("hex");
  }
}
