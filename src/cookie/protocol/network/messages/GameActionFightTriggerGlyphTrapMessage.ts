import AbstractGameActionMessage from "./AbstractGameActionMessage";
export default class GameActionFightTriggerGlyphTrapMessage extends AbstractGameActionMessage {
public markId: number;
public triggeringCharacterId: number;
public triggeredSpellId: number;
constructor(actionId = 0, sourceId = 0, markId = 0, triggeringCharacterId = 0, triggeredSpellId = 0) {
super(actionId, sourceId );
this.markId = markId;
this.triggeringCharacterId = triggeringCharacterId;
this.triggeredSpellId = triggeredSpellId;

}
}
