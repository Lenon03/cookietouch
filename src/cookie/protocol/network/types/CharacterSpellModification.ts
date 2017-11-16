import CharacterBaseCharacteristic from "./CharacterBaseCharacteristic";

export default class CharacterSpellModification {

  public modificationType: number;
  public spellId: number;
  public value: CharacterBaseCharacteristic;

  constructor(modificationType = 0, spellId = 0, value: CharacterBaseCharacteristic) {
    this.modificationType = modificationType;
    this.spellId = spellId;
    this.value = value;
  }
}
