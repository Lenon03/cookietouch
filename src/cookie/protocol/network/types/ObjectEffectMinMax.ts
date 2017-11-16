import ObjectEffect from "./ObjectEffect";

export default class ObjectEffectMinMax extends ObjectEffect {

  public min: number;
  public max: number;

  constructor(actionid = 0, min = 0, max = 0) {
    super(actionid);
    this.min = min;
    this.max = max;
  }
}
