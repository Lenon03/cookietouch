import Message from "@/protocol/network/messages/Message";

export default class CharacterNameSuggestionSuccessMessage extends Message {
  public suggestion: string;

  constructor(suggestion = "") {
    super();
    this.suggestion = suggestion;

  }
}
