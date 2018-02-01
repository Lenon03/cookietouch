import MountClientData from "@protocol/network/types/MountClientData";
import ExchangeStartOkMountWithOutPaddockMessage from "./ExchangeStartOkMountWithOutPaddockMessage";

export default class ExchangeStartOkMountMessage extends ExchangeStartOkMountWithOutPaddockMessage {
  public paddockedMountsDescription: MountClientData[];

  constructor(stabledMountsDescription: MountClientData[], paddockedMountsDescription: MountClientData[]) {
    super(stabledMountsDescription);
    this.paddockedMountsDescription = paddockedMountsDescription;

  }
}
