import PaddockItem from "@protocol/network/types/PaddockItem";
import Message from "./Message";

export default class GameDataPaddockObjectListAddMessage extends Message {
  public paddockItemDescription: PaddockItem[];

  constructor(paddockItemDescription: PaddockItem[]) {
    super();
    this.paddockItemDescription = paddockItemDescription;

  }
}
