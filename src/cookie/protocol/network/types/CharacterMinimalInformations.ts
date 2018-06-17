import AbstractCharacterInformation from "./AbstractCharacterInformation";

export default class CharacterMinimalInformations extends AbstractCharacterInformation {

  public level: number;
  public name: string;

  constructor(id = 0, level = 0, name = "") {
    super(id);
    this.level = level;
    this.name = name;
  }
}
