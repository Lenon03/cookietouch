import Account from "@account";
import FightAction from "../actions/fight/FightAction";

export default class FightAPI {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
  }

  public canFight(
    forbiddenMonsters: number[] = null,
    mandatoryMonsters: number[] = null,
    minMonsters = 1,
    maxMonsters = 8,
    minLevel = 1,
    maxLevel = 1000
  ): boolean {
    return this.account.game.map.canFight(
      minMonsters,
      maxMonsters,
      minLevel,
      maxLevel,
      forbiddenMonsters,
      mandatoryMonsters
    );
  }

  public fight(
    forbiddenMonsters: number[] = null,
    mandatoryMonsters: number[] = null,
    minMonsters = 1,
    maxMonsters = 8,
    minLevel = 1,
    maxLevel = 1000
  ): boolean {
    if (
      !this.canFight(
        forbiddenMonsters,
        mandatoryMonsters,
        minMonsters,
        maxMonsters,
        minLevel,
        maxLevel
      )
    ) {
      return false;
    }
    this.account.scripts.actionsManager.enqueueAction(
      new FightAction(
        minMonsters,
        maxMonsters,
        minLevel,
        maxLevel,
        forbiddenMonsters,
        mandatoryMonsters
      ),
      true
    );
    return true;
  }
}
