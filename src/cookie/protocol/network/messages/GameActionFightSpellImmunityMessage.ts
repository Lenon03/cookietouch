import AbstractGameActionMessage from "./AbstractGameActionMessage";
export default class GameActionFightSpellImmunityMessage extends AbstractGameActionMessage {
public targetId: number;
public spellId: number;
constructor(actionId = 0, sourceId = 0, targetId = 0, spellId = 0) {
super(actionId, sourceId );
this.targetId = targetId;
this.spellId = spellId;

}
}
