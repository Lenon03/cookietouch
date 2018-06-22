import AbstractPartyEventMessage from "@/protocol/network/messages/AbstractPartyEventMessage";

export default class PartyUpdateLightMessage extends AbstractPartyEventMessage {
  public id: number;
  public lifePoints: number;
  public maxLifePoints: number;
  public prospecting: number;
  public regenRate: number;

  constructor(partyId = 0, id = 0, lifePoints = 0, maxLifePoints = 0, prospecting = 0, regenRate = 0) {
    super(partyId);
    this.id = id;
    this.lifePoints = lifePoints;
    this.maxLifePoints = maxLifePoints;
    this.prospecting = prospecting;
    this.regenRate = regenRate;

  }
}
