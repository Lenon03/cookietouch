import Shortcut from "./Shortcut";

export default class ShortcutSmiley extends Shortcut {
  public smileyId: number;

  constructor(slot = 0, smileyId = 0) {
    super(slot);
    this.smileyId = smileyId;

  }
}
