import Message from "@/protocol/network/messages/Message";

export default class InventoryPresetItemUpdateErrorMessage extends Message {
  public code: number;

  constructor(code = 1) {
    super();
    this.code = code;

  }
}
