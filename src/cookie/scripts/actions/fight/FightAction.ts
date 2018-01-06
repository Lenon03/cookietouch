import Account from "@account";
import { MovementRequestResults } from "@game/managers/movements/MovementRequestResults";
import { sleep } from "@utils/Time";
import ScriptAction, { ScriptActionResults } from "../ScriptAction";

export default class FightAction extends ScriptAction {
  public minMonsters: number;
  public maxMonsters: number;
  public minMonstersLevel: number;
  public maxMonstersLevel: number;
  public forbiddenMonsters: number[];
  public mandatoryMonsters: number[];

  constructor(minMonsters: number, maxMonsters: number, minMonstersLevel: number, maxMonstersLevel: number,
              forbiddenMonsters: number[], mandatoryMonsters: number[]) {
    super();
    this.minMonsters = minMonsters;
    this.maxMonsters = maxMonsters;
    this.minMonstersLevel = minMonstersLevel;
    this.maxMonstersLevel = maxMonstersLevel;
    this.forbiddenMonsters = forbiddenMonsters;
    this.mandatoryMonsters = mandatoryMonsters;
  }

  public process(account: Account): Promise<ScriptActionResults> {
    return new Promise(async (resolve, reject) => {
      const availableGroups = account.game.map.getMonstersGroup(this.minMonsters, this.maxMonsters, this.minMonstersLevel,
        this.maxMonstersLevel, this.forbiddenMonsters, this.mandatoryMonsters);

      if (availableGroups.length <= 0) {
        return ScriptAction.doneResult;
      }
      for (const t of availableGroups) {
        if (account.game.map.blacklistedMonsters.includes(t.id)) {
          continue;
        }
        switch (account.game.managers.movements.moveToCell(t.cellId)) {
          case MovementRequestResults.MOVED:
            return ScriptAction.processingResult;
          case MovementRequestResults.ALREADY_THERE:
          case MovementRequestResults.PATH_BLOCKED:
              account.game.map.blacklistedMonsters.push(t.id);
              continue;
          default: // FAILED
            account.scripts.stopScript("reasonstopscript");
            return ScriptAction.failedResult;
        }
      }
      return ScriptAction.doneResult;
    });
  }
}
