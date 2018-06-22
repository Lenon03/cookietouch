import Message from "@/protocol/network/messages/Message";
import ObjectItem from "@/protocol/network/types/ObjectItem";

export default class ExchangeStartedMountStockMessage extends Message {
  public objectsInfos: ObjectItem[];

  constructor(objectsInfos: ObjectItem[]) {
    super();
    this.objectsInfos = objectsInfos;

  }
}
