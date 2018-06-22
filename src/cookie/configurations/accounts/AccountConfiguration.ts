import { Enumerable } from "linqts";
import CharacterCreation from "@/configurations/accounts/CharacterCreation";

export default class AccountConfiguration {
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
}
