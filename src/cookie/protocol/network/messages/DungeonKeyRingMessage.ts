import Message from "@/protocol/network/messages/Message";

export default class DungeonKeyRingMessage extends Message {
  public availables: number[];
  public unavailables: number[];

  constructor(availables: number[], unavailables: number[]) {
    super();
    this.availables = availables;
    this.unavailables = unavailables;

  }
}
