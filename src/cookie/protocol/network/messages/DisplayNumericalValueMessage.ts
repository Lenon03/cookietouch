import Message from "@/protocol/network/messages/Message";

export default class DisplayNumericalValueMessage extends Message {
  public entityId: number;
  public value: number;
  public type: number;

  constructor(entityId = 0, value = 0, type = 0) {
    super();
    this.entityId = entityId;
    this.value = value;
    this.type = type;

  }
}
