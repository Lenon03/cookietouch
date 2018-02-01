import Message from "./Message";

export default class OrnamentSelectRequestMessage extends Message {
  public ornamentId: number;

  constructor(ornamentId = 0) {
    super();
    this.ornamentId = ornamentId;

  }
}
