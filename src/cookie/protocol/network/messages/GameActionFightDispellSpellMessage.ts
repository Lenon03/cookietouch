import GameActionFightDispellMessage from "./GameActionFightDispellMessage";
export default class GameActionFightDispellSpellMessage extends GameActionFightDispellMessage {
public spellId: number;
constructor(actionId = 0, sourceId = 0, targetId = 0, spellId = 0) {
super(actionId, sourceId, targetId );
this.spellId = spellId;

}
}
