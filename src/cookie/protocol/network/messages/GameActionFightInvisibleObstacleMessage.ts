import AbstractGameActionMessage from "./AbstractGameActionMessage";
export default class GameActionFightInvisibleObstacleMessage extends AbstractGameActionMessage {
public sourceSpellId: number;
constructor(actionId = 0, sourceId = 0, sourceSpellId = 0) {
super(actionId, sourceId );
this.sourceSpellId = sourceSpellId;

}
}
