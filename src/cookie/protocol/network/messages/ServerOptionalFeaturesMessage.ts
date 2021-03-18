import Message from "@/protocol/network/messages/Message";

export default class ServerOptionalFeaturesMessage extends Message {
  public features: number[];

  constructor(features: number[]) {
    super();
    this.features = features;

  }
}
