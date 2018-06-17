import CharacterBaseInformations from "./CharacterBaseInformations";
import EntityLook from "./EntityLook";
import PartyCompanionBaseInformations from "./PartyCompanionBaseInformations";

export default class PartyInvitationMemberInformations extends CharacterBaseInformations {
  public companions: PartyCompanionBaseInformations[];
  public worldX: number;
  public worldY: number;
  public mapId: number;
  public subAreaId: number;

  constructor(id = 0, level = 0, name = "", entityLook: EntityLook = null, breed = 0,
              sex = false, worldX = 0, worldY = 0, mapId = 0, subAreaId = 0,
              companions: PartyCompanionBaseInformations[] = null) {
    super(id, level, name, entityLook, breed, sex);
    this.companions = companions;
    this.worldX = worldX;
    this.worldY = worldY;
    this.mapId = mapId;
    this.subAreaId = subAreaId;

  }
}
