import Message from "./Message";

export default class SpouseStatusMessage extends Message {
  public hasSpouse: boolean;

  constructor(hasSpouse = false) {
    super();
    this.hasSpouse = hasSpouse;

  }
}
