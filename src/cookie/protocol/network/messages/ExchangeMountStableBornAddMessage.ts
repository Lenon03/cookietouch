import MountClientData from "@/protocol/network/types/MountClientData";
import ExchangeMountStableAddMessage from "@/protocol/network/messages/ExchangeMountStableAddMessage";

export default class ExchangeMountStableBornAddMessage extends ExchangeMountStableAddMessage {
  constructor(mountDescription: MountClientData) {
    super(mountDescription);

  }
}
