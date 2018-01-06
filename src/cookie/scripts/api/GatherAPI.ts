import Account from "@account";
import GatherAction from "../actions/gather/GatherAction";

export default class GatherAPI {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
  }

  public canGather(...resourcesIds: number[]): boolean {
    // If no resources were set, use the character's jobs
    resourcesIds = resourcesIds.length === 0 ? this.account.game.character.jobs.collectSkillsIds.ToArray() : resourcesIds;
    return this.account.game.managers.gathers.canGather(...resourcesIds);
  }
  public gather(...resourcesIds: number[]): boolean {
    // Using canGather will handle the case of resourcesIds being empty
    if (!this.canGather(...resourcesIds)) {
      return false;
    }
    this.account.scripts.actionsManager.enqueueAction(new GatherAction(resourcesIds), true);
    return true;
  }
}
