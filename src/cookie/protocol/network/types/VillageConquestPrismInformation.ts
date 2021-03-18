import Type from "@/protocol/network/types/Type";

export default class VillageConquestPrismInformation extends Type {
  public areaId: number;
  public areaAlignment: number;
  public isEntered: boolean;
  public isInRoom: boolean;

  constructor(
    areaId = 0,
    areaAlignment = 0,
    isEntered = false,
    isInRoom = false
  ) {
    super();
    this.areaId = areaId;
    this.areaAlignment = areaAlignment;
    this.isEntered = isEntered;
    this.isInRoom = isInRoom;
  }
}
