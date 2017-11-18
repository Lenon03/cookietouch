import AbstractGameActionMessage from "./AbstractGameActionMessage";
export default class GameActionFightSpellCooldownVariationMessage extends AbstractGameActionMessage {
public targetId: number;
public spellId: number;
public value: number;
constructor(actionId = 0, sourceId = 0, targetId = 0, spellId = 0, value = 0) {
super(actionId, sourceId );
this.targetId = targetId;
this.spellId = spellId;
this.value = value;

}
}
