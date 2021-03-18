import UpdateLifePointsMessage from "@/protocol/network/messages/UpdateLifePointsMessage";

export default class LifePointsRegenEndMessage extends UpdateLifePointsMessage {
  public lifePointsGained: number;

  constructor(lifePoints = 0, maxLifePoints = 0, lifePointsGained = 0) {
    super(lifePoints, maxLifePoints);
    this.lifePointsGained = lifePointsGained;

  }
}
