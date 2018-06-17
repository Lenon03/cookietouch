import CharacterBaseInformations from "./CharacterBaseInformations";
import EntityLook from "./EntityLook";
import PartyCompanionMemberInformations from "./PartyCompanionMemberInformations";
import PlayerStatus from "./PlayerStatus";

export default class PartyMemberInformations extends CharacterBaseInformations {
  public companions: PartyCompanionMemberInformations[];
  public lifePoints: number;
  public maxLifePoints: number;
  public prospecting: number;
  public regenRate: number;
  public initiative: number;
  public alignmentSide: number;
  public worldX: number;
  public worldY: number;
  public mapId: number;
  public subAreaId: number;
  public status: PlayerStatus;

  constructor(id = 0, level = 0, name = "", entityLook: EntityLook = null, breed = 0,
              sex = false, lifePoints = 0, maxLifePoints = 0, prospecting = 0, regenRate = 0,
              initiative = 0, alignmentSide = 0, worldX = 0, worldY = 0, mapId = 0, subAreaId = 0,
              status: PlayerStatus = null, companions: PartyCompanionMemberInformations[] = null) {
    super(id, level, name, entityLook, breed, sex);
    this.companions = companions;
    this.lifePoints = lifePoints;
    this.maxLifePoints = maxLifePoints;
    this.prospecting = prospecting;
    this.regenRate = regenRate;
    this.initiative = initiative;
    this.alignmentSide = alignmentSide;
    this.worldX = worldX;
    this.worldY = worldY;
    this.mapId = mapId;
    this.subAreaId = subAreaId;
    this.status = status;

  }
}
