import ShortcutObject from "@/protocol/network/types/ShortcutObject";

export default class ShortcutObjectPreset extends ShortcutObject {
  public presetId: number;

  constructor(slot = 0, presetId = 0) {
    super(slot);
    this.presetId = presetId;
  }
}
