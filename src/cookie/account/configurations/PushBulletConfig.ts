export interface IPushBulletConfig {
  active: boolean;
  level: boolean;
  privateMessage: boolean;
  inJail: boolean;
  captchaRequest: boolean;
  modOnMap: boolean;
  modPrivateMessage: boolean;
  disconnect: boolean;
  levelJob: boolean;
  scriptError: boolean;
}

export default class PushBulletConfig implements IPushBulletConfig {
  public active = false;
  public level = false;
  public privateMessage = false;
  public inJail = false;
  public captchaRequest = false;
  public modOnMap = false;
  public modPrivateMessage = false;
  public disconnect = false;
  public levelJob = false;
  public scriptError = false;

  public toJSON(): IPushBulletConfig {
    return Object.assign({}, this, {});
  }

  public static fromJSON(json: IPushBulletConfig | string): PushBulletConfig {
    if (typeof json === "string") {
      return JSON.parse(json, PushBulletConfig.reviver);
    } else {
      const pushBullet = Object.create(PushBulletConfig.prototype);
      // tslint:disable-next-line:prefer-object-spread
      return Object.assign(pushBullet, json, {});
    }
  }

  public static reviver(key: string, value: string): any {
    return key === "" ? PushBulletConfig.fromJSON(value) : value;
  }
}
