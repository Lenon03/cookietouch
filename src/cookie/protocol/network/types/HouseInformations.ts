import Type from "@/protocol/network/types/Type";

export default class HouseInformations extends Type {
  public doorsOnMap: any[];
  public houseId: number;
  public isOnSale: boolean;
  public isSaleLocked: boolean;
  public modelId: number;
  public ownerName: string;
  // public specialArtworkId: number;

  constructor(
    houseid = 0,
    ownername = "",
    isOnSale = false,
    isSaleLocked = false,
    modelId = 0,
    doorsOnMap: any[] = []
  ) {
    super();
    this.doorsOnMap = doorsOnMap;
    this.houseId = houseid;
    this.ownerName = ownername;
    this.isOnSale = isOnSale;
    this.isSaleLocked = isSaleLocked;
    this.modelId = modelId;
  }
}
