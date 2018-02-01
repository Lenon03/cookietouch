import GameActionFightDispellMessage from "./GameActionFightDispellMessage";

export default class GameActionFightDispellEffectMessage extends GameActionFightDispellMessage {
  public boostUID: number;

  constructor(actionId = 0, sourceId = 0, targetId = 0, boostUID = 0) {
    super(actionId, sourceId, targetId);
    this.boostUID = boostUID;

  }
}
