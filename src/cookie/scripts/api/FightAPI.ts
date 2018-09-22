import Account from "@/account";
import FightAction from "@/scripts/actions/fight/FightAction";

export default class FightAPI {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
  }

  public canFight(
    forbiddenMonsters?: number[],
    mandatoryMonsters?: number[],
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

  public async fight(
    forbiddenMonsters?: number[],
    mandatoryMonsters?: number[],
    minMonsters = 1,
    maxMonsters = 8,
    minLevel = 1,
    maxLevel = 1000
  ): Promise<boolean> {
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
    await this.account.scripts.actionsManager.enqueueAction(
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
