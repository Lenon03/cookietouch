import Message from "@/protocol/network/messages/Message";

export default class MountRenameRequestMessage extends Message {
  public name: string;
  public mountId: number;

  constructor(name = "", mountId = 0) {
    super();
    this.name = name;
    this.mountId = mountId;

  }
}
