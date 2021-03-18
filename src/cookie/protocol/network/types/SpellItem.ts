import Item from "@/protocol/network/types/Item";

export default class SpellItem extends Item {
  public position: number;
  public spellId: number;
  public spellLevel: number;

  constructor(position = 0, spellId = 0, spellLevel = 0) {
    super();
    this.position = position;
    this.spellId = spellId;
    this.spellLevel = spellLevel;
  }
}
