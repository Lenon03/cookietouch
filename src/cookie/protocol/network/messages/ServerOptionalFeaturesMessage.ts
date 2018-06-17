import Message from "./Message";

export default class ServerOptionalFeaturesMessage extends Message {
  public features: number[];

  constructor(features: number[]) {
    super();
    this.features = features;

  }
}
