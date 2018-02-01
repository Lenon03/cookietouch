import Message from "./Message";

export default class CharacterCapabilitiesMessage extends Message {
  public guildEmblemSymbolCategories: number;

  constructor(guildEmblemSymbolCategories = 0) {
    super();
    this.guildEmblemSymbolCategories = guildEmblemSymbolCategories;

  }
}
