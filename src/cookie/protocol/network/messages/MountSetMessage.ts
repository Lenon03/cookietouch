import Message from "@/protocol/network/messages/Message";
import MountClientData from "@/protocol/network/types/MountClientData";

export default class MountSetMessage extends Message {
  public mountData: MountClientData;

  constructor(mountData: MountClientData) {
    super();
    this.mountData = mountData;

  }
}
