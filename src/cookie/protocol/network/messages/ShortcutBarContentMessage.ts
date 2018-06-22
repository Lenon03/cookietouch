import Message from "@/protocol/network/messages/Message";
import Shortcut from "@/protocol/network/types/Shortcut";

export default class ShortcutBarContentMessage extends Message {
  public shortcuts: Shortcut[];
  public barType: number;

  constructor(barType = 0, shortcuts: Shortcut[]) {
    super();
    this.shortcuts = shortcuts;
    this.barType = barType;

  }
}
