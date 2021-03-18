import Account from "@/account";
import Bid from "@/game/bid";
import Character from "@/game/character";
import Craft from "@/game/craft";
import Chat from "@/game/chat";
import Exchange from "@/game/exchange";
import Fight from "@/game/fight";
import Managers from "@/game/managers";
import Map from "@/game/map";
import Npcs from "@/game/npcs";
import Server from "@/game/server";
import Storage from "@/game/storage";
import IClearable from "@/utils/IClearable";

export default class Game implements IClearable {
  public managers: Managers;
  public character: Character;

  public craft: Craft;
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
    this.craft = new Craft(account);
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
