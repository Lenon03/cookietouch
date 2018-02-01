import GameActionFightLifePointsLostMessage from "./GameActionFightLifePointsLostMessage";

export default class GameActionFightLifeAndShieldPointsLostMessage extends GameActionFightLifePointsLostMessage {
  public shieldLoss: number;

  constructor(actionId = 0, sourceId = 0, targetId = 0, loss = 0, permanentDamages = 0, shieldLoss = 0) {
    super(actionId, sourceId, targetId, loss, permanentDamages);
    this.shieldLoss = shieldLoss;

  }
}
