import Message from "@/protocol/network/messages/Message";
import MountClientData from "@/protocol/network/types/MountClientData";

export default class ExchangeStartOkMountWithOutPaddockMessage extends Message {
  public stabledMountsDescription: MountClientData[];

  constructor(stabledMountsDescription: MountClientData[]) {
    super();
    this.stabledMountsDescription = stabledMountsDescription;

  }
}
