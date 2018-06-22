import Item from "@/protocol/network/types/Item";
import ObjectEffect from "@/protocol/network/types/ObjectEffect";

export default class ObjectItemToSellInHumanVendorShop extends Item {

  public effects: ObjectEffect[];
  public objectgid: number;
  public objectuid: number;
  public quantity: number;
  public objectprice: number;
  public publicprice: number;

  constructor(objectgid = 0, objectuid = 0, quantity = 0, objectprice = 0, publicprice = 0, effects: ObjectEffect[]) {
    super();
    this.effects = effects;
    this.objectgid = objectgid;
    this.objectuid = objectuid;
    this.quantity = quantity;
    this.objectprice = objectprice;
    this.publicprice = publicprice;
  }
}
