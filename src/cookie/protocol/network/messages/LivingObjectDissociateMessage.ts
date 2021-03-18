import Message from "@/protocol/network/messages/Message";

export default class LivingObjectDissociateMessage extends Message {
  public livingUID: number;
  public livingPosition: number;

  constructor(livingUID = 0, livingPosition = 0) {
    super();
    this.livingUID = livingUID;
    this.livingPosition = livingPosition;

  }
}
