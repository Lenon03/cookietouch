import Message from "@/protocol/network/messages/Message";

export default class AllianceFactsErrorMessage extends Message {
  public allianceId: number;

  constructor(allianceId = 0) {
    super();
    this.allianceId = allianceId;

  }
}
