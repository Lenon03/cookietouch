import LanguageManager from "@/configurations/language/LanguageManager";
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
    let m = randomPart.match(ChangeMapAction.REGEX_SPECIFIC);
    if (m)  {
      return new ChangeMapAction(MapChangeDirections[capitalize(m[1])], parseInt(m[2], 10));
    } else {
      // Simple directions
      m = randomPart.match(ChangeMapAction.REGEX_DIRECTIONS);
      if (m)  {
        return new ChangeMapAction(MapChangeDirections[capitalize(m[0])], -1);
      } else {
        // Change map from cells
        m = randomPart.match(ChangeMapAction.REGEX_CELLID);
        if (m)  {
          return new ChangeMapAction(MapChangeDirections.NONE, parseInt(m[0], 10));
        }
      }
    }
    return null;
  }

  private static REGEX_SPECIFIC = /(top|haut|right|droite|bottom|bas|left|gauche)\((\d{1,3})\)/;
  private static REGEX_DIRECTIONS = /(top|haut|right|droite|bottom|bas|left|gauche)/;
  private static REGEX_CELLID = /(\d{1,3})/;

  public _name: string = "ChangeMapAction";
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

  public async process(account: Account): Promise<ScriptActionResults> {
    if (this.isSpecificDirection) {
      if (!account.game.managers.movements.changeMapWithCellId(this.direction, this.cellId)) {
        account.scripts.stopScript(LanguageManager.trans("changeMapSpecificFailed", MapChangeDirections[this.direction], this.cellId));
        return ScriptAction.failedResult();
      }
      account.logger.logDebug(LanguageManager.trans("scripts"),
        LanguageManager.trans("changeMapSpecific", MapChangeDirections[this.direction], this.cellId));
    } else if (this.isSimpleDirection) {
      if (!account.game.managers.movements.changeMap(this.direction)) {
        account.scripts.stopScript(LanguageManager.trans("changeMapDirectionFailed", MapChangeDirections[this.direction]));
        return ScriptAction.failedResult();
      }
      account.logger.logDebug(LanguageManager.trans("scripts"), LanguageManager.trans("changeMapDirection", MapChangeDirections[this.direction]));
    } else {
      // Move to a cell that will change the map
      const result = account.game.managers.movements.moveToCell(this.cellId);
      if (result !== MovementRequestResults.MOVED) {
        account.scripts.stopScript(LanguageManager.trans("changeMapCellFailed", this.cellId, MovementRequestResults[result]));
        return ScriptAction.failedResult();
      }
      account.logger.logDebug(LanguageManager.trans("scripts"), LanguageManager.trans("changeMapCell", this.cellId));
    }
    return ScriptAction.processingResult();
  }
}
