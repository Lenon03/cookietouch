import Message from "./Message";

export default class CharacterNameSuggestionFailureMessage extends Message {
  public reason: number;

  constructor(reason = 1) {
    super();
    this.reason = reason;

  }
}
