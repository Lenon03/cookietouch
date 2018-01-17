import { Enumerable, List } from "linqts";
import CharacterCreation from "./CharacterCreation";

export default class AccountConfiguration {
  public username: string;
  public password: string;
  public server: string;
  public character: string;
  public nickname: string;
  public characterCreation: CharacterCreation;
  public planificationActivated: boolean;
  public planification: List<boolean>;

  constructor(username: string, password: string, server = "", character = "", nickname = "") {
    this.server = server;
    this.character = character;
    this.nickname = nickname;
    this.username = username;
    this.password = password;
    this.characterCreation = new CharacterCreation();
    this.planificationActivated = false;
    this.planification = Enumerable.Repeat(true, 24);
  }
}
