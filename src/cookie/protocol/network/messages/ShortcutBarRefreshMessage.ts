import Message from "@/protocol/network/messages/Message";
import Shortcut from "@/protocol/network/types/Shortcut";

export default class ShortcutBarRefreshMessage extends Message {
  public barType: number;
  public shortcut: Shortcut;

  constructor(barType = 0, shortcut: Shortcut) {
    super();
    this.barType = barType;
    this.shortcut = shortcut;

  }
}
