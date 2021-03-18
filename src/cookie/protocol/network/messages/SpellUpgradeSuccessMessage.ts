import Message from "@/protocol/network/messages/Message";

export default class SpellUpgradeSuccessMessage extends Message {
  public spellId: number;
  public spellLevel: number;

  constructor(spellId = 0, spellLevel = 0) {
    super();
    this.spellId = spellId;
    this.spellLevel = spellLevel;

  }
}
