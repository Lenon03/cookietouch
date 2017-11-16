import AbstractCharacterInformation from "./AbstractCharacterInformation";

export default class CharacterToRelookInformation extends AbstractCharacterInformation {

  public cosmeticid: number;

  constructor(id = 0, cosmeticid = 0) {
    super(id);
    this.cosmeticid = cosmeticid;
  }
}
