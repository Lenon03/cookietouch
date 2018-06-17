import Type from "./Type";

export default class SellerBuyerDescriptor extends Type {
  public quantities: number[];
  public types: number[];
  public taxPercentage: number;
  public taxModificationPercentage: number;
  public maxItemLevel: number;
  public maxItemPerAccount: number;
  public npcContextualId: number;
  public unsoldDelay: number;

  constructor(taxPercentage = 0, taxModificationPercentage = 0, maxItemLevel = 0,
              maxItemPerAccount = 0, npcContextualId = 0, unsoldDelay = 0, quantities: number[] = null,
              types: number[] = null) {
    super();
    this.quantities = quantities;
    this.types = types;
    this.taxPercentage = taxPercentage;
    this.taxModificationPercentage = taxModificationPercentage;
    this.maxItemLevel = maxItemLevel;
    this.maxItemPerAccount = maxItemPerAccount;
    this.npcContextualId = npcContextualId;
    this.unsoldDelay = unsoldDelay;
  }
}
