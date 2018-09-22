import Type from "@/protocol/network/types/Type";

export default class HouseInformationsForGuild extends Type {
  public skillListIds: number[];
  public houseId: number;
  public modelId: number;
  public ownerName: string;
  public worldX: number;
  public worldY: number;
  public mapId: number;
  public subAreaId: number;
  public guildshareParams: number;

  constructor(
    houseId = 0,
    modelId = 0,
    ownerName = "",
    worldX = 0,
    worldY = 0,
    mapId = 0,
    subAreaId = 0,
    guildshareParams = 0,
    skillListIds: number[] = []
  ) {
    super();
    this.skillListIds = skillListIds;
    this.houseId = houseId;
    this.modelId = modelId;
    this.ownerName = ownerName;
    this.worldX = worldX;
    this.worldY = worldY;
    this.mapId = mapId;
    this.subAreaId = subAreaId;
    this.guildshareParams = guildshareParams;
  }
}
