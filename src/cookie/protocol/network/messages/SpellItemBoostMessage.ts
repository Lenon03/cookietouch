import Message from "@/protocol/network/messages/Message";

export default class SpellItemBoostMessage extends Message {
  public statId: number;
  public spellId: number;
  public value: number;

  constructor(statId = 0, spellId = 0, value = 0) {
    super();
    this.statId = statId;
    this.spellId = spellId;
    this.value = value;

  }
}
