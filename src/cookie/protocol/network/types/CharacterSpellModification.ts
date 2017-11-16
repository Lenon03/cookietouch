import CharacterBaseCharacteristic from "./CharacterBaseCharacteristic";

export default class CharacterSpellModification {

  public modificationtype: number;
  public spellid: number;
  public value: CharacterBaseCharacteristic;

  constructor(modificationtype = 0, spellid = 0, value: CharacterBaseCharacteristic) {
    this.modificationtype = modificationtype;
    this.spellid = spellid;
    this.value = value;
    this.value = value;
  }
}
