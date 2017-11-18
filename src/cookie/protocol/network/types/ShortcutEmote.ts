import Shortcut from "./Shortcut";
export default class ShortcutEmote extends Shortcut {
  public emoteId: number;
  constructor(slot = 0, emoteId = 0) {
    super(slot);
    this.emoteId = emoteId;

  }
}
