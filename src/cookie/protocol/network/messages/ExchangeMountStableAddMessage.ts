import Message from "@/protocol/network/messages/Message";
import MountClientData from "@/protocol/network/types/MountClientData";

export default class ExchangeMountStableAddMessage extends Message {
  public mountDescription: MountClientData;

  constructor(mountDescription: MountClientData) {
    super();
    this.mountDescription = mountDescription;

  }
}
