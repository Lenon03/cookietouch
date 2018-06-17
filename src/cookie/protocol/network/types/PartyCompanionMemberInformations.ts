import EntityLook from "./EntityLook";
import PartyCompanionBaseInformations from "./PartyCompanionBaseInformations";

export default class PartyCompanionMemberInformations extends PartyCompanionBaseInformations {
  public initiative: number;
  public lifePoints: number;
  public maxLifePoints: number;
  public prospecting: number;
  public regenRate: number;

  constructor(indexId = 0, companionGenericId = 0, entityLook: EntityLook = null,
              initiative = 0, lifePoints = 0, maxLifePoints = 0, prospecting = 0, regenRate = 0) {
    super(indexId, companionGenericId, entityLook);
    this.initiative = initiative;
    this.lifePoints = lifePoints;
    this.maxLifePoints = maxLifePoints;
    this.prospecting = prospecting;
    this.regenRate = regenRate;

  }
}
