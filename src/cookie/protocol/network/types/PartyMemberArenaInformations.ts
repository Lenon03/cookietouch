import EntityLook from "./EntityLook";
import PartyCompanionMemberInformations from "./PartyCompanionMemberInformations";
import PartyMemberInformations from "./PartyMemberInformations";
import PlayerStatus from "./PlayerStatus";

export default class PartyMemberArenaInformations extends PartyMemberInformations {
  public rank: number;

  constructor(id = 0, level = 0, name = "", entityLook: EntityLook = null, breed = 0,
              sex = false, lifePoints = 0, maxLifePoints = 0, prospecting = 0, regenRate = 0,
              initiative = 0, alignmentSide = 0, worldX = 0, worldY = 0, mapId = 0, subAreaId = 0,
              status: PlayerStatus = null, rank = 0,
              companions: PartyCompanionMemberInformations[] = null) {
    super(id, level, name, entityLook, breed, sex, lifePoints, maxLifePoints,
      prospecting, regenRate, initiative, alignmentSide, worldX, worldY, mapId,
      subAreaId, status, companions);
    this.rank = rank;

  }
}
