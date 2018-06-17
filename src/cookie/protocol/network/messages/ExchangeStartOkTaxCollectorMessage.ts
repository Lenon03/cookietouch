import ObjectItem from "@protocol/network/types/ObjectItem";
import Message from "./Message";

export default class ExchangeStartOkTaxCollectorMessage extends Message {
  public objectsInfos: ObjectItem[];
  public collectorId: number;
  public goldInfo: number;

  constructor(collectorId = 0, goldInfo = 0, objectsInfos: ObjectItem[]) {
    super();
    this.objectsInfos = objectsInfos;
    this.collectorId = collectorId;
    this.goldInfo = goldInfo;

  }
}
