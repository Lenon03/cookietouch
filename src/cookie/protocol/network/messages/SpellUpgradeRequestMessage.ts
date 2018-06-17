import Message from "./Message";

export default class SpellUpgradeRequestMessage extends Message {
  public spellId: number;
  public spellLevel: number;

  constructor(spellId = 0, spellLevel = 0) {
    super();
    this.spellId = spellId;
    this.spellLevel = spellLevel;

  }
}
