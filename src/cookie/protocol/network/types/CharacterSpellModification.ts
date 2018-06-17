import CharacterBaseCharacteristic from "./CharacterBaseCharacteristic";
import Type from "./Type";

export default class CharacterSpellModification extends Type {

  public modificationType: number;
  public spellId: number;
  public value: CharacterBaseCharacteristic;

  constructor(modificationType = 0, spellId = 0, value: CharacterBaseCharacteristic) {
    super();
    this.modificationType = modificationType;
    this.spellId = spellId;
    this.value = value;
  }
}
