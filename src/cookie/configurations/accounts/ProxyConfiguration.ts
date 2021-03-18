export interface IProxyConfiguration {
  ip: string;
  port: number;
  username: string;
  password: string;
}

export default class ProxyConfiguration {
  public get isValid(): boolean {
    return this.ip.length > 0;
  }

  public get url(): string {
    return this.ip.length > 0 ? `http://${this.ip}:${this.port}` : "";
  }

  constructor(
    public ip: string = "",
    public port: number = 0,
    public username: string = "",
    public password: string = ""
  ) {}

  public toJSON(): IProxyConfiguration {
    return Object.assign({}, this, {});
  }

  public static fromJSON(
    json: IProxyConfiguration | string
  ): ProxyConfiguration {
    if (typeof json === "string") {
      return JSON.parse(json, ProxyConfiguration.reviver);
    } else {
      const proxy = Object.create(ProxyConfiguration.prototype);
      // tslint:disable-next-line:prefer-object-spread
      return Object.assign(proxy, json, {});
    }
  }

  public static reviver(key: string, value: string): any {
    return key === "" ? ProxyConfiguration.fromJSON(value) : value;
  }
}
