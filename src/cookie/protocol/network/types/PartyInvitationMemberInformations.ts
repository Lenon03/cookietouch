import CharacterBaseInformations from "@/protocol/network/types/CharacterBaseInformations";
import EntityLook from "@/protocol/network/types/EntityLook";
import PartyCompanionBaseInformations from "@/protocol/network/types/PartyCompanionBaseInformations";

export default class PartyInvitationMemberInformations extends CharacterBaseInformations {
  public companions: PartyCompanionBaseInformations[];
  public worldX: number;
  public worldY: number;
  public mapId: number;
  public subAreaId: number;

  constructor(
    id = 0,
    level = 0,
    name = "",
    entityLook = new EntityLook(),
    breed = 0,
    sex = false,
    worldX = 0,
    worldY = 0,
    mapId = 0,
    subAreaId = 0,
    companions: PartyCompanionBaseInformations[] = []
  ) {
    super(id, level, name, entityLook, breed, sex);
    this.companions = companions;
    this.worldX = worldX;
    this.worldY = worldY;
    this.mapId = mapId;
    this.subAreaId = subAreaId;
  }
}
