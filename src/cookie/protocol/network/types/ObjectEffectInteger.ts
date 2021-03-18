import ObjectEffect from "@/protocol/network/types/ObjectEffect";

export default class ObjectEffectInteger extends ObjectEffect {

  public value: number;

  constructor(actionid = 0, value = 0) {
    super(actionid);
    this.value = value;
  }
}
