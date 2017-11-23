import Account from "@account";
import QueueFrame from "./common/QueueFrame";
import SecurityFrame from "./common/SecurityFrame";
import CharacterSelectionFrame from "./connection/CharacterSelectionFrame";
import IdentificationFrame from "./connection/IdentificationFrame";
import ServerSelectionFrame from "./connection/ServerSelectionFrame";
import AchievementsFrame from "./game/AchievementsFrames";
import BidFrame from "./game/BidFrame";
import CharacterFrame from "./game/CharacterFrame";
import ChatFrame from "./game/ChatFrame";
import ExchangeFrame from "./game/ExchangeFrame";
import FightFrame from "./game/FightFrame";
import InventoryFrame from "./game/InventoryFrame";
import MapFrame from "./game/MapFrame";
import NpcsFrame from "./game/NpcsFrame";
import QuestsFrame from "./game/QuestsFrame";
import StorageFrame from "./game/StorageFrame";

export default class Frames {

  private chat: ChatFrame;
  private queue: QueueFrame;
  private security: SecurityFrame;
  private characterSelection: CharacterSelectionFrame;
  private identification: IdentificationFrame;
  private serverSelection: ServerSelectionFrame;
  private map: MapFrame;
  private character: CharacterFrame;
  private inventory: InventoryFrame;
  private achievements: AchievementsFrame;
  private bid: BidFrame;
  private exchange: ExchangeFrame;
  private npcs: NpcsFrame;
  private quests: QuestsFrame;
  private storage: StorageFrame;
  private fight: FightFrame;

  constructor(account: Account) {
    this.achievements = new AchievementsFrame(account);
    this.bid = new BidFrame(account);
    this.chat = new ChatFrame(account);
    this.queue = new QueueFrame(account);
    this.security = new SecurityFrame(account);
    this.characterSelection = new CharacterSelectionFrame(account);
    this.identification = new IdentificationFrame(account);
    this.serverSelection = new ServerSelectionFrame(account);
    this.character = new CharacterFrame(account);
    this.map = new MapFrame(account);
    this.inventory = new InventoryFrame(account);
    this.exchange = new ExchangeFrame(account);
    this.npcs = new NpcsFrame(account);
    this.quests = new QuestsFrame(account);
    this.storage = new StorageFrame(account);
    this.fight = new FightFrame(account);
  }
}
