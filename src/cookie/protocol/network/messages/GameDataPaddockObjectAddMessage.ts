import Message from "@/protocol/network/messages/Message";
import PaddockItem from "@/protocol/network/types/PaddockItem";

export default class GameDataPaddockObjectAddMessage extends Message {
  public paddockItemDescription: PaddockItem;

  constructor(paddockItemDescription: PaddockItem) {
    super();
    this.paddockItemDescription = paddockItemDescription;

  }
}
