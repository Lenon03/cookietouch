import MountClientData from "@/protocol/network/types/MountClientData";
import Message from "@/protocol/network/messages/Message";

export default class MountDataMessage extends Message {
  public mountData: MountClientData;

  constructor(mountData: MountClientData) {
    super();
    this.mountData = mountData;

  }
}
