import Type from "./Type";

export default class PresetItem extends Type {
  public position: number;
  public objGid: number;
  public objUid: number;
  constructor(position = 63, objGid = 0, objUid = 0) {
    super();
    this.position = position;
    this.objGid = objGid;
    this.objUid = objUid;
  }
}
