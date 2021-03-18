import Account from "@/account";
import { MovementRequestResults } from "@/game/managers/movements/MovementRequestResults";
import ScriptAction, { ScriptActionResults } from "@/scripts/actions/ScriptAction";

export default class MoveToCellAction extends ScriptAction {
  public _name: string = "MoveToCellAction";
  public cellId: number;

  constructor(cellId: number) {
    super();
    this.cellId = cellId;
  }

  public async process(account: Account): Promise<ScriptActionResults> {
    switch (account.game.managers.movements.moveToCell(this.cellId)) {
      case MovementRequestResults.MOVED:
        return ScriptAction.processingResult();
      case MovementRequestResults.PATH_BLOCKED:
      case MovementRequestResults.ALREADY_THERE:
        return ScriptAction.doneResult();
      default:
        // Failed
        return ScriptAction.failedResult();
    }
  }
}
