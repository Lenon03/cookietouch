import Account from "@account";
import { AccountStates } from "@account/AccountStates";
import { MapChangeDirections } from "@game/managers/movements/MapChangeDirections";
import { MovementRequestResults } from "@game/managers/movements/MovementRequestResults";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class ChangeMapAction extends ScriptAction {
  public direction: MapChangeDirections;
  public cellId: number;

  get isSpecificDirection() {
    return this.direction !== MapChangeDirections.NONE && this.cellId !== -1;
  }

  get isSimpleDirection() {
    return this.direction !== MapChangeDirections.NONE && this.cellId === -1;
  }

  constructor(direction: MapChangeDirections, cellId: number) {
    super();
    this.direction = direction;
    this.cellId = cellId;
  }

  protected process(account: Account): Promise<ScriptActionResults> {
    return new Promise(async (resolve, reject) => {
      if (this.isSpecificDirection) {
        if (!account.game.managers.movements.changeMapWithCellId(this.direction, this.cellId)) {
          account.scripts.stopScript("reasonstopscript");
          return resolve(ScriptActionResults.FAILED);
        }
      } else if (this.isSimpleDirection) {
        if (!account.game.managers.movements.changeMap(this.direction)) {
          account.scripts.stopScript("reasonstopscript");
          return resolve(ScriptActionResults.FAILED);
        }
      } else {
        // Move to a cell that will change the map
        const result = account.game.managers.movements.moveToCell(this.cellId);
        if (result !== MovementRequestResults.MOVED) {
          account.scripts.stopScript("reasonstopscript");
          return resolve(ScriptActionResults.FAILED);
        }
      }
      let mapChanged = false;
      let movementFailed = false;
      const account_mapChanged = () => {
        mapChanged = true;
      };
      const account_movementFinished = (success: boolean) => {
        movementFailed = !success;
      };
      account.game.map.MapChanged.on(account_mapChanged);
      account.game.managers.movements.MovementFinished.on(account_movementFinished);
      for (let i = 0; i < 20 && !mapChanged && !movementFailed && account.state !== AccountStates.FIGHTING && account.scripts.running; i++) {
        await sleep(1000);
      }
      account.game.map.MapChanged.off(account_mapChanged);
      account.game.managers.movements.MovementFinished.off(account_movementFinished);
      // If the movement fails or if the character gets into an unwanted fight, we need to stop re-trying
      if (movementFailed || account.state === AccountStates.FIGHTING) {
        return resolve(ScriptActionResults.FAILED);
      }
      // If the script stops or gets paused during this, we don't need to re-process
      if (mapChanged || !account.scripts.running) {
        return resolve(ScriptActionResults.PROCESSING);
      }
      return await this.process(account);
    });
  }
}
