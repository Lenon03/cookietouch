import ObjectItemToSellInNpcShop from "@protocol/network/types/ObjectItemToSellInNpcShop";
import Message from "./Message";

export default class ExchangeStartOkNpcShopMessage extends Message {
  public objectsInfos: ObjectItemToSellInNpcShop[];
  public npcSellerId: number;
  public tokenId: number;

  constructor(npcSellerId = 0, tokenId = 0, objectsInfos: ObjectItemToSellInNpcShop[]) {
    super();
    this.objectsInfos = objectsInfos;
    this.npcSellerId = npcSellerId;
    this.tokenId = tokenId;

  }
}
