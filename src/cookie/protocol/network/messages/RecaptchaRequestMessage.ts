import Message from "@/protocol/network/messages/Message";

interface IEnrichData {
  sitekey: string;
}

export default class RecaptchaRequestMessage extends Message {
  public enrichData: IEnrichData;

  constructor(enrichData: IEnrichData) {
    super();
    this.enrichData = enrichData;
  }
}
