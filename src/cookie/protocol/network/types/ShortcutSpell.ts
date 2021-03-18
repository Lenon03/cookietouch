import Shortcut from "@/protocol/network/types/Shortcut";

export default class ShortcutSpell extends Shortcut {
  public spellId: number;

  constructor(slot = 0, spellId = 0) {
    super(slot);
    this.spellId = spellId;
  }
}
