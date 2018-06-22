import Message from "@/protocol/network/messages/Message";

export default class ExchangeMultiCraftSetCrafterCanUseHisRessourcesMessage extends Message {
  public allow: boolean;

  constructor(allow = false) {
    super();
    this.allow = allow;

  }
}
