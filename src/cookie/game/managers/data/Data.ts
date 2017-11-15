export interface IData {
  type: string;
  id: number;
  nameId: number;
}

export default class Data {
  public nameId: string;
  public id: number;
  private _type: string; // tslint:disable-line

  get type() {
    return this._type;
  }
}
