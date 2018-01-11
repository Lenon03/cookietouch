import Type from "./Type";

export default class MonsterInGroupLightInformations extends Type {
  public creatureGenericId: number;
  public grade: number;

  constructor(creatureGenericId = 0, grade = 0) {
    super();
    this.creatureGenericId = creatureGenericId;
    this.grade = grade;
  }
}
