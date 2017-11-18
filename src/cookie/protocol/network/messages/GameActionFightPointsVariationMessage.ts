import AbstractGameActionMessage from "./AbstractGameActionMessage";
export default class GameActionFightPointsVariationMessage extends AbstractGameActionMessage {
public targetId: number;
public delta: number;
constructor(actionId = 0, sourceId = 0, targetId = 0, delta = 0) {
super(actionId, sourceId );
this.targetId = targetId;
this.delta = delta;

}
}
