export default class PresetItem {
  public position: number;
  public objGid: number;
  public objUid: number;
  constructor(position = 63, objGid = 0, objUid = 0) {

    this.position = position;
    this.objGid = objGid;
    this.objUid = objUid;

  }
}
