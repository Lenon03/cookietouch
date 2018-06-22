import Message from "@/protocol/network/messages/Message";

export default class LivingObjectChangeSkinRequestMessage extends Message {
  public livingUID: number;
  public livingPosition: number;
  public skinId: number;

  constructor(livingUID = 0, livingPosition = 0, skinId = 0) {
    super();
    this.livingUID = livingUID;
    this.livingPosition = livingPosition;
    this.skinId = skinId;

  }
}
