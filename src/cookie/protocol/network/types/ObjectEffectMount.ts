import ObjectEffect from "./ObjectEffect";

export default class ObjectEffectMount extends ObjectEffect {

  public mountId: number;
  public date: number;
  public modelId: number;

  constructor(actionid = 0, mountId = 0, date = 0, modelId = 0) {
    super(actionid);
    this.mountId = mountId;
    this.date = date;
    this.modelId = modelId;
  }
}
