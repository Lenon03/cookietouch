import Data from "@/protocol/data/Data";

export default class ItemTypes extends Data {
  public nameId: string = "";
  public superTypeId: number = 0;
  public plural: boolean = false;
  public gender: number = 0;
  public rawZone: string = "";
  public needUseConfirm: boolean = false;
}
