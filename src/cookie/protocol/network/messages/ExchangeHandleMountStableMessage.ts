import Message from "./Message";

export default class ExchangeHandleMountStableMessage extends Message {
  public actionType: number;
  public rideId: number;

  constructor(actionType = 0, rideId = 0) {
    super();
    this.actionType = actionType;
    this.rideId = rideId;

  }
}
