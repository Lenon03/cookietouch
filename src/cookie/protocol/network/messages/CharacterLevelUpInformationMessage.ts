import CharacterLevelUpMessage from "./CharacterLevelUpMessage";

export default class CharacterLevelUpInformationMessage extends CharacterLevelUpMessage {
  public name: string;
  public id: number;

  constructor(newLevel = 0, name = "", id = 0) {
    super(newLevel);
    this.name = name;
    this.id = id;

  }
}
