import PlayerStatus from "./PlayerStatus";
import Type from "./Type";

export default class JobCrafterDirectoryEntryPlayerInfo extends Type {

  public playerId: number;
  public playerName: string;
  public alignmentSide: number;
  public breed: number;
  public sex: boolean;
  public isInWorkShop: boolean;
  public worldX: number;
  public worldY: number;
  public mapId: number;
  public subAreaId: number;
  public status: PlayerStatus;

  constructor(playerId = 0, playerName = "", alignmentSide = 0, breed = 0,
              sex = false, isInWorkShop = false, worldX = 0, worldY = 0, mapId = 0,
              subAreaId = 0, status: PlayerStatus) {
    super();
    this.playerId = playerId;
    this.playerName = playerName;
    this.alignmentSide = alignmentSide;
    this.breed = breed;
    this.sex = sex;
    this.isInWorkShop = isInWorkShop;
    this.worldX = worldX;
    this.worldY = worldY;
    this.mapId = mapId;
    this.subAreaId = subAreaId;
    this.status = status;
    this.status = status;
  }
}
