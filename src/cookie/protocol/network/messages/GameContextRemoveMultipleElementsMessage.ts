import Message from "@/protocol/network/messages/Message";

export default class GameContextRemoveMultipleElementsMessage extends Message {
  public id: number[];

  constructor(id: number[]) {
    super();
    this.id = id;

  }
}
