import Account from "@account";
import IClearable from "@utils/IClearable";
import Bid from "./Bid";
import Character from "./character";
import Chat from "./chat";
import Exchange from "./Exchange";
import Managers from "./managers";
import Map from "./Map";
import Server from "./Server";

export default class Game implements IClearable {

  public managers: Managers;
  public character: Character;
  public map: Map;
  public chat: Chat;
  public server: Server;
  public bid: Bid;
  public exchange: Exchange;

  constructor(account: Account) {
    this.managers = new Managers(account);
    this.character = new Character(account);
    this.map = new Map(account);
    this.chat = new Chat(account);
    this.server = new Server(account);
    this.bid = new Bid(account);
    this.exchange = new Exchange(account);
  }

  public clear() {
    this.character.clear();
    this.managers.clear();
    this.map.clear();
    this.bid.clear();
  }
}
