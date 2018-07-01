import CharacterCreation, {
  ICharacterCreation
} from "@/configurations/accounts/CharacterCreation";
import { Enumerable } from "linqts";

export interface IAccountConfiguration {
  username: string;
  password: string;
  server: number;
  character: string;
  characterCreation: ICharacterCreation;
  planificationActivated: boolean;
  planification: boolean[];
}

export default class AccountConfiguration implements IAccountConfiguration {
  public username: string;
  public password: string;
  public server: number;
  public character: string;
  public characterCreation: CharacterCreation;
  public planificationActivated: boolean;
  public planification: boolean[];

  constructor(username: string, password: string, server = -1, character = "") {
    this.server = server;
    this.character = character;
    this.username = username;
    this.password = password;
    this.characterCreation = new CharacterCreation();
    this.planificationActivated = false;
    this.planification = Enumerable.Repeat(true, 24).ToArray();
  }

  public toJSON(): IAccountConfiguration {
    return Object.assign({}, this, {
      characterCreation: this.characterCreation.toJSON()
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
      const test = Object.assign(accountConfiguration, json, {
        characterCreation: CharacterCreation.fromJSON(json.characterCreation)
      });
      return test;
    }
  }

  public static reviver(key: string, value: string): any {
    return key === "" ? AccountConfiguration.fromJSON(value) : value;
  }
}
