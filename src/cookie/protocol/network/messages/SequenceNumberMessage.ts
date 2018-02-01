import Message from "./Message";

export default class SequenceNumberMessage extends Message {
  public number: number;

  constructor(num = 0) {
    super();
    this.number = num;
  }
}
