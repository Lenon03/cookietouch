import ObjectItem from "@/protocol/network/types/ObjectItem";
import InventoryContentMessage from "@/protocol/network/messages/InventoryContentMessage";

export default class StorageInventoryContentMessage extends InventoryContentMessage {
  constructor(kamas = 0, objects: ObjectItem[]) {
    super(kamas, objects);

  }
}
