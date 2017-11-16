import ObjectEffect from "./ObjectEffect";
import ObjectItemMinimalInformation from "./ObjectItemMinimalInformation";

export default class ObjectItemInformationWithQuantity extends ObjectItemMinimalInformation {

  public quantity: number;

  constructor(objectgid = 0, quantity = 0, effects: ObjectEffect[]) {
    super(objectgid, effects);
    this.quantity = quantity;
  }
}
