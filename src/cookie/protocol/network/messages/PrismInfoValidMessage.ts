import Message from "@/protocol/network/messages/Message";
import ProtectedEntityWaitingForHelpInfo from "@/protocol/network/types/ProtectedEntityWaitingForHelpInfo";

export default class PrismInfoValidMessage extends Message {
  public waitingForHelpInfo: ProtectedEntityWaitingForHelpInfo;

  constructor(waitingForHelpInfo: ProtectedEntityWaitingForHelpInfo) {
    super();
    this.waitingForHelpInfo = waitingForHelpInfo;

  }
}
