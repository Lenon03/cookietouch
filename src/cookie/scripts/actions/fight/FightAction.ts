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

  public async process(account: Account): Promise<ScriptActionResults> {
    const availableGroups = account.game.map.getMonstersGroup(this.minMonsters, this.maxMonsters, this.minMonstersLevel,
      this.maxMonstersLevel, this.forbiddenMonsters, this.mandatoryMonsters);

    if (availableGroups.length <= 0) {
      return ScriptAction.doneResult();
    }
    for (const t of availableGroups) {
      if (account.game.map.blacklistedMonsters.includes(t.id)) {
        continue;
      }
      switch (account.game.managers.movements.moveToCell(t.cellId)) {
        case MovementRequestResults.MOVED:
          account.scripts.actionsManager.monstersGroupToAttack = t.id;
          account.logger.logDebug("Scripts",
            `Moving towards a group of monsters (cell: ${t.cellId}, monsters: ${t.monstersCount}, level: ${t.totalLevel})`);
          return ScriptAction.processingResult();
        case MovementRequestResults.ALREADY_THERE:
        case MovementRequestResults.PATH_BLOCKED:
          account.logger.logWarning("Scripts", `The path towards the group of monsters is probably blocked.`);
          account.game.map.blacklistedMonsters.push(t.id);
          continue;
        default: // FAILED
          account.scripts.stopScript("Movement towarfs a group of monsters failed.");
          return ScriptAction.failedResult();
      }
    }
    return ScriptAction.doneResult();
  }
}
