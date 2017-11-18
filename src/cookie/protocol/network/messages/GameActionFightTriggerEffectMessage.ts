import GameActionFightDispellEffectMessage from "./GameActionFightDispellEffectMessage";
export default class GameActionFightTriggerEffectMessage extends GameActionFightDispellEffectMessage {
constructor(actionId = 0, sourceId = 0, targetId = 0, boostUID = 0) {
super(actionId, sourceId, targetId, boostUID );

}
}
