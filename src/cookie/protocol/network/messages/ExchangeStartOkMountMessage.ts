import ExchangeStartOkMountWithOutPaddockMessage from "@/protocol/network/messages/ExchangeStartOkMountWithOutPaddockMessage";
import MountClientData from "@/protocol/network/types/MountClientData";

export default class ExchangeStartOkMountMessage extends ExchangeStartOkMountWithOutPaddockMessage {
  public paddockedMountsDescription: MountClientData[];

  constructor(stabledMountsDescription: MountClientData[], paddockedMountsDescription: MountClientData[]) {
    super(stabledMountsDescription);
    this.paddockedMountsDescription = paddockedMountsDescription;

  }
}
