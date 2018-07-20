import CharacterCreation, {
  ICharacterCreation
} from "@/configurations/accounts/CharacterCreation";
import ProxyConfiguration, {
  IProxyConfiguration
} from "@/configurations/accounts/ProxyConfiguration";
import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import { Enumerable } from "linqts";

export interface IAccountConfiguration {
  username: string;
  password: string;
  server: number;
  character: string;
  characterCreation: ICharacterCreation;
  planificationActivated: boolean;
  planification: boolean[];
  proxy: IProxyConfiguration;
}

export default class AccountConfiguration implements IAccountConfiguration {
  public username: string;
  public password: string;
  public server: number;
  public character: string;
  public characterCreation: CharacterCreation;
  public planificationActivated: boolean;
  public planification: boolean[];
  public proxy: ProxyConfiguration;

  constructor(username: string, password: string, server = -1, character = "") {
    this.server = server;
    this.character = character;
    this.username = username;
    this.password = password;
    this.characterCreation = new CharacterCreation();
    this.planificationActivated = false;
    this.planification = Enumerable.Repeat(true, 24).ToArray();
    this.proxy = new ProxyConfiguration();
  }

  public setProxy(
    ip: string,
    port: number,
    username: string = "",
    password: string = ""
  ) {
    this.proxy.ip = ip;
    this.proxy.port = port;
    this.proxy.username = username;
    this.proxy.password = password;

    GlobalConfiguration.save();
  }

  public toJSON(): IAccountConfiguration {
    return Object.assign({}, this, {
      characterCreation: this.characterCreation.toJSON(),
      proxy: this.proxy.toJSON()
    });
  }

  public static fromJSON(
    json: IAccountConfiguration | string
  ): AccountConfiguration {
    if (typeof json === "string") {
      return JSON.parse(json, AccountConfiguration.reviver);
    } else {
      const accountConfiguration = Object.create(
        AccountConfiguration.prototype
      );
      // tslint:disable-next-line:prefer-object-spread
      return Object.assign(accountConfiguration, json, {
        characterCreation: CharacterCreation.fromJSON(json.characterCreation),
        proxy:
          json.proxy === undefined
            ? new ProxyConfiguration()
            : ProxyConfiguration.fromJSON(json.proxy)
      });
    }
  }

  public static reviver(key: string, value: string): any {
    return key === "" ? AccountConfiguration.fromJSON(value) : value;
  }
}
