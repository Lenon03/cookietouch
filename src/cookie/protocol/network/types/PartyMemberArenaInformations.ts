import EntityLook from "@/protocol/network/types/EntityLook";
import PartyCompanionMemberInformations from "@/protocol/network/types/PartyCompanionMemberInformations";
import PartyMemberInformations from "@/protocol/network/types/PartyMemberInformations";
import PlayerStatus from "@/protocol/network/types/PlayerStatus";

export default class PartyMemberArenaInformations extends PartyMemberInformations {
  public rank: number;

  constructor(
    id = 0,
    level = 0,
    name = "",
    entityLook = new EntityLook(),
    breed = 0,
    sex = false,
    lifePoints = 0,
    maxLifePoints = 0,
    prospecting = 0,
    regenRate = 0,
    initiative = 0,
    alignmentSide = 0,
    worldX = 0,
    worldY = 0,
    mapId = 0,
    subAreaId = 0,
    status = new PlayerStatus(),
    rank = 0,
    companions: PartyCompanionMemberInformations[] = []
  ) {
    super(
      id,
      level,
      name,
      entityLook,
      breed,
      sex,
      lifePoints,
      maxLifePoints,
      prospecting,
      regenRate,
      initiative,
      alignmentSide,
      worldX,
      worldY,
      mapId,
      subAreaId,
      status,
      companions
    );
    this.rank = rank;
  }
}
