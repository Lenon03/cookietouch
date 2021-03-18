import ExchangeMountStableAddMessage from "@/protocol/network/messages/ExchangeMountStableAddMessage";
import MountClientData from "@/protocol/network/types/MountClientData";

export default class ExchangeMountStableBornAddMessage extends ExchangeMountStableAddMessage {
  constructor(mountDescription: MountClientData) {
    super(mountDescription);

  }
}
