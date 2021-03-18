import * as crypto from "crypto";

export default class Crypto {
  private static algorithm = "aes-256-ctr";

  private key: Buffer;
  private iv: Buffer;

  constructor(password: string) {
    const keys = Crypto.compute(Crypto.algorithm, password);
    this.key = Buffer.from(keys[0], "hex");
    this.iv = Buffer.from(keys[1], "hex");
  }

  public encrypt(text: string) {
    const cipher = crypto.createCipheriv(Crypto.algorithm, this.key, this.iv);
    let crypted = cipher.update(text, "utf8", "hex");
    crypted += cipher.final("hex");
    return crypted;
  }

  public decrypt(text: string) {
    const decipher = crypto.createDecipheriv(
      Crypto.algorithm,
      this.key,
      this.iv
    );
    let dec = decipher.update(text, "hex", "utf8");
    dec += decipher.final("utf8");
    return dec;
  }

  public createHash(text: string) {
    return crypto
      .createHash("md5")
      .update(text)
      .digest("hex");
  }

  private static compute(cipher: string, passphrase: string) {
    let [nkey, niv] = Crypto.sizes(cipher);
    for (let key = "", iv = "", p = ""; ; ) {
      const h = crypto.createHash("md5");
      h.update(p);
      h.update(passphrase);
      p = h.digest("hex");
      let n;
      let i = 0;
      n = Math.min(p.length - i, 2 * nkey);
      nkey -= n / 2;
      key += p.slice(i, i + n);
      i += n;
      n = Math.min(p.length - i, 2 * niv);
      niv -= n / 2;
      iv += p.slice(i, i + n);
      i += n;
      if (nkey + niv === 0) {
        return [key, iv];
      }
    }
  }

  private static sizes(cipher: string) {
    for (let nkey = 1, niv = 0; ; ) {
      try {
        crypto.createCipheriv(cipher, ".".repeat(nkey), ".".repeat(niv));
        return [nkey, niv];
      } catch (e) {
        if (/invalid iv length/i.test(e.message)) {
          niv += 1;
        } else if (/invalid key length/i.test(e.message)) {
          nkey += 1;
        } else {
          throw e;
        }
      }
    }
  }
}
