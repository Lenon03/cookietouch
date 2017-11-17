import Account from "@account";
import IClearable from "@utils/IClearable";
import Character from "./character";
import Chat from "./chat";
import Managers from "./managers";
import Map from "./Map";
import Server from "./Server";

export default class Game implements IClearable {

  public managers: Managers;
  public character: Character;
  public map: Map;
  public chat: Chat;
  public server: Server;

  private account: Account;

  constructor(account: Account) {
    this.account = account;

    this.managers = new Managers(this.account);
    this.character = new Character(this.account);
    this.map = new Map(this.account);
    this.chat = new Chat(this.account);
    this.server = new Server(this.account);
  }

  public clear() {
    this.character.clear();
    this.managers.clear();
    this.map.clear();
  }
}
