import Message from "./Message";

export default class AllianceFactsRequestMessage extends Message {
  public allianceId: number;

  constructor(allianceId = 0) {
    super();
    this.allianceId = allianceId;

  }
}
