import Data from "@/protocol/data/Data";

export default class AlignmentRank extends Data {
  public orderId: number = 0;
  public nameId: string = "";
  public descriptionId: string = "";
  public minimumAlignment: number = 0;
  public objectsStolen: number = 0;
  public gifts: object[] = [];
}
