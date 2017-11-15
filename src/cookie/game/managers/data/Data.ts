export interface IData {
  type: string;
  id: number;
}

export default class Data {
  public id: number;
  private _type: string; // tslint:disable-line

  get type() {
    return this._type;
  }
}
