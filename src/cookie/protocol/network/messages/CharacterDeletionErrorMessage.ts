import Message from "./Message";

export default class CharacterDeletionErrorMessage extends Message {
  public reason: number;

  constructor(reason = 1) {
    super();
    this.reason = reason;

  }
}
