import Message from "@/protocol/network/messages/Message";

export default class PauseDialogMessage extends Message {
  public dialogType: number;

  constructor(dialogType = 0) {
    super();
    this.dialogType = dialogType;

  }
}
