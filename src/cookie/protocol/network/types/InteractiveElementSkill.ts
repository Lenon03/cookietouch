export default class InteractiveElementSkill {
  public skillId: number;
  public skillInstanceUid: number;

  /* tslint:disable */
  public _cursor: number;
  public _name: string;
  public _parentJobName: string;
  public _levelMin: number;
  public _parentJobId: number;
  /* tslint:enable */
  constructor(skillId = 0, skillInstanceUid = 0) {
    this.skillId = skillId;
    this.skillInstanceUid = skillInstanceUid;
  }
}
