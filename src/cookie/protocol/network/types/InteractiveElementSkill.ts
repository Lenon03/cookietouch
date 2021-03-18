import Type from "@/protocol/network/types/Type";

export default class InteractiveElementSkill extends Type {
  public skillId: number;
  public skillInstanceUid: number;
  public _cursor: number;
  public _name: string;
  public _parentJobName: string;
  public _levelMin: number;
  public _parentJobId: number;

  constructor(
    skillId = 0,
    skillInstanceUid = 0,
    cursor = 0,
    name = "",
    parentJobName = "",
    levelMin = 0,
    parentJobId = 0
  ) {
    super();
    this.skillId = skillId;
    this.skillInstanceUid = skillInstanceUid;
    this._cursor = cursor;
    this._parentJobName = parentJobName;
    this._name = name;
    this._levelMin = levelMin;
    this._parentJobId = parentJobId;
  }
}
