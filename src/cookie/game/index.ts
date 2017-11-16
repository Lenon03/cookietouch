import IClearable from "@/IClearable";
import Account from "@account";
import Character from "./character";
import Managers from "./managers";
import Map from "./Map";

export default class Game implements IClearable {

  public managers: Managers;
  public character: Character;
  public map: Map;

  private account: Account;

  constructor(account: Account) {
    this.account = account;

    this.managers = new Managers(this.account);
    this.character = new Character(this.account);
    this.map = new Map(this.account);
  }

  public clear() {
    this.character.clear();
    this.managers.clear();
    this.map.clear();
  }
}
