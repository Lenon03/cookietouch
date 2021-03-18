import ObjectEffect from "@/protocol/network/types/ObjectEffect";
import ObjectItemMinimalInformation from "@/protocol/network/types/ObjectItemMinimalInformation";

export default class ObjectItemToSellInNpcShop extends ObjectItemMinimalInformation {

  public objectPrice: number;
  public buyCriterion: string;

  constructor(objectgid = 0, objectPrice = 0, buyCriterion = "", effects: ObjectEffect[]) {
    super(objectgid, effects);
    this.objectPrice = objectPrice;
    this.buyCriterion = buyCriterion;
  }
}
