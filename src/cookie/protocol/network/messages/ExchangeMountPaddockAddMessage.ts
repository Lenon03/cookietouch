import MountClientData from "@/protocol/network/types/MountClientData";
import Message from "@/protocol/network/messages/Message";

export default class ExchangeMountPaddockAddMessage extends Message {
  public mountDescription: MountClientData;

  constructor(mountDescription: MountClientData) {
    super();
    this.mountDescription = mountDescription;

  }
}
