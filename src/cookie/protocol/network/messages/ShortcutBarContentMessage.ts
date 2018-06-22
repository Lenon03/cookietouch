import Shortcut from "@/protocol/network/types/Shortcut";
import Message from "@/protocol/network/messages/Message";

export default class ShortcutBarContentMessage extends Message {
  public shortcuts: Shortcut[];
  public barType: number;

  constructor(barType = 0, shortcuts: Shortcut[]) {
    super();
    this.shortcuts = shortcuts;
    this.barType = barType;

  }
}
