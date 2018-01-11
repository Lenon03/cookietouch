import Account from "@account";
import Map from "@game/map";
import IClearable from "@utils/IClearable";
import GathersManager from "./gathers";
import InteractivesManager from "./interactives";
import MovementsManager from "./movements";
import TeleportablesManager from "./teleportables";

export default class Managers implements IClearable {
  public movements: MovementsManager;
  public interactives: InteractivesManager;
  public teleportables: TeleportablesManager;
  public gathers: GathersManager;

  constructor(account: Account, map: Map) {
    this.movements = new MovementsManager(account, map);
    this.interactives = new InteractivesManager(account, this.movements);
    this.gathers = new GathersManager(account, this.movements, map);
    this.teleportables = new TeleportablesManager(account, this.interactives, map);
  }

  public clear() {
    this.movements.clear();
    this.interactives.clear();
    this.gathers.clear();
  }

  public cancel() {
    this.movements.cancel();
    this.interactives.cancelUse();
    this.gathers.cancelGather();
    this.teleportables.cancel();
  }
}
