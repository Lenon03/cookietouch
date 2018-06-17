import Message from "./Message";

export default class CharacterLevelUpMessage extends Message {
  public newLevel: number;

  constructor(newLevel = 0) {
    super();
    this.newLevel = newLevel;

  }
}
