import Account from "@account";
import BidAPI from "./BidAPI";
import CharacterAPI from "./CharacterAPI";
import ExchangeAPI from "./ExchangeAPI";
import FightAPI from "./FightAPI";
import GatherAPI from "./GatherAPI";
import InventoryAPI from "./InventoryAPI";
import JobsAPI from "./JobsAPI";
import MapAPI from "./MapAPI";
import MountAPI from "./MountAPI";
import NpcAPI from "./NpcAPI";
import StorageAPI from "./StorageAPI";

export default class API {

  public bid: BidAPI;
  public character: CharacterAPI;
  public exchange: ExchangeAPI;
  public fight: FightAPI;
  public gather: GatherAPI;
  public inventory: InventoryAPI;
  public jobs: JobsAPI;
  public map: MapAPI;
  public mount: MountAPI;
  public npc: NpcAPI;
  public storage: StorageAPI;

  constructor(account: Account) {
    this.bid = new BidAPI(account);
    this.character = new CharacterAPI(account);
    this.exchange = new ExchangeAPI(account);
    this.fight = new FightAPI(account);
    this.gather = new GatherAPI(account);
    this.inventory = new InventoryAPI(account);
    this.jobs = new JobsAPI(account);
    this.map = new MapAPI(account);
    this.mount = new MountAPI(account);
    this.npc = new NpcAPI(account);
    this.storage = new StorageAPI(account);
  }
}
