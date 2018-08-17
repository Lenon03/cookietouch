import Account from "@/account";
import GatherAction from "@/scripts/actions/gather/GatherAction";

export default class GatherAPI {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
  }

  public canGather(...resourcesIds: number[]): boolean {
    // If no resources were set, use the character's jobs
    resourcesIds =
      resourcesIds.length === 0
        ? this.account.game.character.jobs.collectSkillsIds.ToArray()
        : resourcesIds;
    return this.account.game.managers.gathers.canGather(...resourcesIds);
  }

  public async gather(...resourcesIds: number[]): Promise<boolean> {
    // Using canGather will handle the case of resourcesIds being empty
    if (!this.canGather(...resourcesIds)) {
      return false;
    }
    await this.account.scripts.actionsManager.enqueueAction(
      new GatherAction(resourcesIds),
      true
    );
    return true;
  }
}
