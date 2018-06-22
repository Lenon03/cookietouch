import Message from "@/protocol/network/messages/Message";

export default class MountRenamedMessage extends Message {
  public mountId: number;
  public name: string;

  constructor(mountId = 0, name = "") {
    super();
    this.mountId = mountId;
    this.name = name;

  }
}
