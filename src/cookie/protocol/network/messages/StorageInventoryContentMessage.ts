import InventoryContentMessage from "@/protocol/network/messages/InventoryContentMessage";
import ObjectItem from "@/protocol/network/types/ObjectItem";

export default class StorageInventoryContentMessage extends InventoryContentMessage {
  constructor(kamas = 0, objects: ObjectItem[]) {
    super(kamas, objects);

  }
}
