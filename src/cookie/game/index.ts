import Account from "@account";
import IClearable from "@utils/IClearable";
import Bid from "./bid";
import Character from "./character";
import Chat from "./chat";
import Exchange from "./exchange";
import Fight from "./fight";
import Managers from "./managers";
import Map from "./map";
import Npcs from "./npcs";
import Server from "./server";
import Storage from "./storage";

export default class Game implements IClearable {
  public managers: Managers;
  public character: Character;
  public map: Map;
  public chat: Chat;
  public server: Server;
  public bid: Bid;
  public exchange: Exchange;
  public npcs: Npcs;
  public storage: Storage;
  public fight: Fight;

  constructor(account: Account) {
    this.server = new Server(account);
    this.character = new Character(account);
    this.map = new Map(account);
    this.fight = new Fight(account);
    this.managers = new Managers(account, this.map);
    this.chat = new Chat(account);
    this.npcs = new Npcs(account);
    this.storage = new Storage(account);
    this.exchange = new Exchange(account);
    this.bid = new Bid(account);
  }

  public clear() {
    this.character.clear();
    this.map.clear();
    this.fight.clear();
    this.managers.clear();
    this.bid.clear();
  }
}
