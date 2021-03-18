import AbstractGameActionFightTargetedAbilityMessage from "@/protocol/network/messages/AbstractGameActionFightTargetedAbilityMessage";

export default class GameActionFightSpellCastMessage extends AbstractGameActionFightTargetedAbilityMessage {
  public spellId: number;
  public spellLevel: number;

  constructor(actionId = 0, sourceId = 0, targetId = 0, destinationCellId = 0,
              critical = 1, silentCast = false, spellId = 0, spellLevel = 0) {
    super(actionId, sourceId, targetId, destinationCellId, critical, silentCast);
    this.spellId = spellId;
    this.spellLevel = spellLevel;

  }
}
