import Account from "@/account";
import Map from "@/game/map";
import IClearable from "@/utils/IClearable";
import GathersManager from "@/game/managers/gathers";
import InteractivesManager from "@/game/managers/interactives";
import MovementsManager from "@/game/managers/movements";
import TeleportablesManager from "@/game/managers/teleportables";

export default class Managers implements IClearable {
  public movements: MovementsManager;
  public interactives: InteractivesManager;
  public teleportables: TeleportablesManager;
  public gathers: GathersManager;

  constructor(account: Account, map: Map) {
    this.movements = new MovementsManager(account, map);
    this.interactives = new InteractivesManager(account, this.movements);
    this.gathers = new GathersManager(account, this.movements, map);
    this.teleportables = new TeleportablesManager(
      account,
      this.interactives,
      map
    );
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
