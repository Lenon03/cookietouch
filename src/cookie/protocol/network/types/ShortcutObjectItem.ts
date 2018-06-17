import ShortcutObject from "./ShortcutObject";

export default class ShortcutObjectItem extends ShortcutObject {
  public itemUID: number;
  public itemGID: number;

  constructor(slot = 0, itemUID = 0, itemGID = 0) {
    super(slot);
    this.itemUID = itemUID;
    this.itemGID = itemGID;

  }
}
