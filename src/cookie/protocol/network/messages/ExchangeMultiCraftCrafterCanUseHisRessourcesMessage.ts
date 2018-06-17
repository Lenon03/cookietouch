import Message from "./Message";

export default class ExchangeMultiCraftCrafterCanUseHisRessourcesMessage extends Message {
  public allowed: boolean;

  constructor(allowed = false) {
    super();
    this.allowed = allowed;

  }
}
