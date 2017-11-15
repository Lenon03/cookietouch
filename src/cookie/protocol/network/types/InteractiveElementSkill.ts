export default class InteractiveElementSkill {
  public skillId: number;
  public skillInstanceUid: number;

  /* tslint:disable */
  private _name: string;
  private _parentJobName: string;
  private _levelMin: number;
  private _parentJobId: number;
  /* tslint:enable */

  get name() {
    return this._name;
  }

  get parentName() {
    return this._parentJobName;
  }

  get levelMin() {
    return this._levelMin;
  }

  get parentJobId() {
    return this._parentJobId;
  }
}
