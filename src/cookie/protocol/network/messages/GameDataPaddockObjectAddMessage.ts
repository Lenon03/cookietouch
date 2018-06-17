import PaddockItem from "@protocol/network/types/PaddockItem";
import Message from "./Message";

export default class GameDataPaddockObjectAddMessage extends Message {
  public paddockItemDescription: PaddockItem;

  constructor(paddockItemDescription: PaddockItem) {
    super();
    this.paddockItemDescription = paddockItemDescription;

  }
}
