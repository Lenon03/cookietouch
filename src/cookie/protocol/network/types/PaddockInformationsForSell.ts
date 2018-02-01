import Type from "./Type";

export default class PaddockInformationsForSell extends Type {
  public guildOwner: string;
  public worldX: number;
  public worldY: number;
  public subAreaId: number;
  public nbMount: number;
  public nbObject: number;
  public price: number;

  constructor(guildOwner = "", worldX = 0, worldY = 0, subAreaId = 0, nbMount = 0, nbObject = 0, price = 0) {
    super();
    this.guildOwner = guildOwner;
    this.worldX = worldX;
    this.worldY = worldY;
    this.subAreaId = subAreaId;
    this.nbMount = nbMount;
    this.nbObject = nbObject;
    this.price = price;
  }
}
