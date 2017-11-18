import AbstractGameActionFightTargetedAbilityMessage from "./AbstractGameActionFightTargetedAbilityMessage";
export default class GameActionFightCloseCombatMessage extends AbstractGameActionFightTargetedAbilityMessage {
  public weaponGenericId: number;
  constructor(actionId = 0, sourceId = 0, targetId = 0, destinationCellId = 0,
              critical = 1, silentCast = false, weaponGenericId = 0) {
    super(actionId, sourceId, targetId, destinationCellId, critical, silentCast);
    this.weaponGenericId = weaponGenericId;

  }
}
