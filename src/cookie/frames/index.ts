import Account from "../Account";
import BasicFrame from "./BasicFrame";
import QueueFrame from "./common/QueueFrame";
import SecurityFrame from "./common/SecurityFrame";
import CharacterSelectionFrame from "./connection/CharacterSelectionFrame";
import IdentificationFrame from "./connection/IdentificationFrame";
import ServerSelectionFrame from "./connection/ServerSelectionFrame";
import CharacterFrame from "./game/CharacterFrame";
import InventoryFrame from "./game/InventoryFrame";
import MapFrame from "./game/MapFrame";

export default class Frames {

  private basic: BasicFrame;
  private queue: QueueFrame;
  private security: SecurityFrame;
  private characterSelection: CharacterSelectionFrame;
  private identification: IdentificationFrame;
  private serverSelection: ServerSelectionFrame;
  private map: MapFrame;
  private character: CharacterFrame;
  private inventory: InventoryFrame;

  private account: Account;

  constructor(account: Account) {
    this.account = account;

    this.basic = new BasicFrame(this.account);
    this.queue = new QueueFrame(this.account);
    this.security = new SecurityFrame(this.account);
    this.characterSelection = new CharacterSelectionFrame(this.account);
    this.identification = new IdentificationFrame(this.account);
    this.serverSelection = new ServerSelectionFrame(this.account);
    this.character = new CharacterFrame(this.account);
    this.map = new MapFrame(this.account);
    this.inventory = new InventoryFrame(this.account);
  }
}
