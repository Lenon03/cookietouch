import AbstractCharacterInformation from "@/protocol/network/types/AbstractCharacterInformation";

export default class CharacterToRelookInformation extends AbstractCharacterInformation {

  public cosmeticId: number;

  constructor(id = 0, cosmeticId = 0) {
    super(id);
    this.cosmeticId = cosmeticId;
  }
}
