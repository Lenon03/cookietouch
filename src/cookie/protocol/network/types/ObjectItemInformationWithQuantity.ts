import ObjectEffect from "@/protocol/network/types/ObjectEffect";
import ObjectItemMinimalInformation from "@/protocol/network/types/ObjectItemMinimalInformation";

export default class ObjectItemInformationWithQuantity extends ObjectItemMinimalInformation {

  public quantity: number;

  constructor(objectgid = 0, quantity = 0, effects: ObjectEffect[]) {
    super(objectgid, effects);
    this.quantity = quantity;
  }
}
