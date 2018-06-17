import PartyUpdateLightMessage from "./PartyUpdateLightMessage";

export default class PartyCompanionUpdateLightMessage extends PartyUpdateLightMessage {
  public indexId: number;

  constructor(partyId = 0, id = 0, lifePoints = 0, maxLifePoints = 0, prospecting = 0, regenRate = 0, indexId = 0) {
    super(partyId, id, lifePoints, maxLifePoints, prospecting, regenRate);
    this.indexId = indexId;

  }
}
