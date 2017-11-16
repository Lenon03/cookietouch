export default class JobExperience {

  public jobId: number;
  public jobLevel: number;
  public jobXp: number;
  public jobXpLevelFloor: number;
  public jobXpNextLevelFloor: number;

  constructor(jobId = 0, jobLevel = 0, jobXp = 0, jobXpLevelFloor = 0, jobXpNextLevelFloor = 0) {
    this.jobId = jobId;
    this.jobLevel = jobLevel;
    this.jobXp = jobXp;
    this.jobXpLevelFloor = jobXpLevelFloor;
    this.jobXpNextLevelFloor = jobXpNextLevelFloor;
  }
}
