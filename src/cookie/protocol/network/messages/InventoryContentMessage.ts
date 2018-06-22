import ObjectItem from "@/protocol/network/types/ObjectItem";
import Message from "@/protocol/network/messages/Message";

export default class InventoryContentMessage extends Message {
  public objects: ObjectItem[];
  public kamas: number;

  constructor(kamas = 0, objects: ObjectItem[]) {
    super();
    this.objects = objects;
    this.kamas = kamas;

  }
}
