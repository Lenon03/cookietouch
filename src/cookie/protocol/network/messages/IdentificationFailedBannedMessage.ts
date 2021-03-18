import IdentificationFailedMessage from "@/protocol/network/messages/IdentificationFailedMessage";

export default class IdentificationFailedBannedMessage extends IdentificationFailedMessage {
  public banEndDate: number;

  constructor(reason = 99, banEndDate = 0) {
    super(reason);
    this.banEndDate = banEndDate;

  }
}
