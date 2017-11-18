import Account from "@account";
import Map from "@game/map";
import IClearable from "@utils/IClearable";
import InteractivesManager from "./interactives";
import MovementsManager from "./movements";
import TeleportablesManager from "./teleportables";

export default class Managers implements IClearable {
  public movements: MovementsManager;
  public interactives: InteractivesManager;
  public teleportables: TeleportablesManager;

  constructor(account: Account, map: Map) {
    this.movements = new MovementsManager(account, map);
    this.interactives = new InteractivesManager(account, this.movements);
    this.teleportables = new TeleportablesManager(account, this.interactives, map);
  }

  public clear() {
    this.movements.clear();
    this.interactives.clear();
  }
}
