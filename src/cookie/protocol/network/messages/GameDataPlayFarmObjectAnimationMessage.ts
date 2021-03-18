import Message from "@/protocol/network/messages/Message";

export default class GameDataPlayFarmObjectAnimationMessage extends Message {
  public cellId: number[];

  constructor(cellId: number[]) {
    super();
    this.cellId = cellId;

  }
}
