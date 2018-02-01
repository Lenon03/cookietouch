import BasicGuildInformations from "@protocol/network/types/BasicGuildInformations";
import Message from "./Message";

export default class TaxCollectorAttackedMessage extends Message {
  public firstNameId: number;
  public lastNameId: number;
  public worldX: number;
  public worldY: number;
  public mapId: number;
  public subAreaId: number;
  public guild: BasicGuildInformations;

  constructor(firstNameId = 0, lastNameId = 0, worldX = 0, worldY = 0, mapId = 0, subAreaId = 0, guild: BasicGuildInformations) {
    super();
    this.firstNameId = firstNameId;
    this.lastNameId = lastNameId;
    this.worldX = worldX;
    this.worldY = worldY;
    this.mapId = mapId;
    this.subAreaId = subAreaId;
    this.guild = guild;

  }
}
