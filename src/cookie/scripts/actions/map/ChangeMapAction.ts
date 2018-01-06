import Account from "@account";
import { AccountStates } from "@account/AccountStates";
import { MapChangeDirections } from "@game/managers/movements/MapChangeDirections";
import { MovementRequestResults } from "@game/managers/movements/MovementRequestResults";
import { getRandomInt } from "@utils/Random";
import { capitalize } from "@utils/String";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class ChangeMapAction extends ScriptAction {

  public static tryParse(text: string): ChangeMapAction {
    const parts = text.split("|");
    const randomPart = parts[getRandomInt(0, parts.length - 1)];
    // Specific direction
    let m = text.match(ChangeMapAction.REGEX_SPECIFIC);
    if (m) {
      return new ChangeMapAction(MapChangeDirections[capitalize(m[1])], parseInt(m[2], 10));
    }
    // Simple directions
    m = text.match(ChangeMapAction.REGEX_DIRECTIONS);
    if (m) {
      return new ChangeMapAction(MapChangeDirections[capitalize(m[0])], -1);
    }
    // Change map from cells
    m = text.match(ChangeMapAction.REGEX_CELLID);
    if (m) {
      return new ChangeMapAction(MapChangeDirections.NONE, parseInt(m[0], 10));
    }
    return null;
  }

  private static REGEX_SPECIFIC = /(top|haut|right|droite|bottom|bas|left|gauche)\((\d{1,3})\)/;
  private static REGEX_DIRECTIONS = /(top|haut|right|droite|bottom|bas|left|gauche)/;
  private static REGEX_CELLID = /(\d{1,3})/;

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

  public process(account: Account): Promise<ScriptActionResults> {
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
