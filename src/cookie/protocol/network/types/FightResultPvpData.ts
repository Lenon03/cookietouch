export default class FightResultPvpData {

  public grade: number;
  public minHonorForGrade: number;
  public maxHonorForGrade: number;
  public honor: number;
  public honorDelta: number;

  constructor(grade = 0, minHonorForGrade = 0, maxHonorForGrade = 0, honor = 0, honorDelta = 0) {
    this.grade = grade;
    this.minHonorForGrade = minHonorForGrade;
    this.maxHonorForGrade = maxHonorForGrade;
    this.honor = honor;
    this.honorDelta = honorDelta;
  }
}
