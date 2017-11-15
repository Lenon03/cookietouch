export default class MonsterInGroupLightInformations {
  public creatureGenericId: number;
  public grade: number;

  constructor(creatureGenericId = 0, grade = 0) {
    this.creatureGenericId = creatureGenericId;
    this.grade = grade;
  }
}
