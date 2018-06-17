import AbstractCharacterInformation from "./AbstractCharacterInformation";

export default class CharacterToRecolorInformation extends AbstractCharacterInformation {

  public colors: number[];

  constructor(id = 0, colors: number[]) {
    super(id);
    this.colors = colors;
  }
}
