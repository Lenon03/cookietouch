import Message from "./Message";

export default class TaxCollectorStateUpdateMessage extends Message {
  public uniqueId: number;
  public state: number;

  constructor(uniqueId = 0, state = 0) {
    super();
    this.uniqueId = uniqueId;
    this.state = state;

  }
}
