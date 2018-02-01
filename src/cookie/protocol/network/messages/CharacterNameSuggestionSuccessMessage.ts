import Message from "./Message";

export default class CharacterNameSuggestionSuccessMessage extends Message {
  public suggestion: string;

  constructor(suggestion = "") {
    super();
    this.suggestion = suggestion;

  }
}
