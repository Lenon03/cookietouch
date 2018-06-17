import SpellItem from "@protocol/network/types/SpellItem";
import Message from "./Message";

export default class SpellListMessage extends Message {
  public spells: SpellItem[];
  public spellPrevisualization: boolean;

  constructor(spellPrevisualization = false, spells: SpellItem[]) {
    super();
    this.spells = spells;
    this.spellPrevisualization = spellPrevisualization;

  }
}
