import Type from "@/protocol/network/types/Type";

export default class JobExperience extends Type {

  public jobId: number;
  public jobLevel: number;
  public jobXP: number;
  public jobXpLevelFloor: number;
  public jobXpNextLevelFloor: number;

  constructor(jobId = 0, jobLevel = 0, jobXP = 0, jobXpLevelFloor = 0, jobXpNextLevelFloor = 0) {
    super();
    this.jobId = jobId;
    this.jobLevel = jobLevel;
    this.jobXP = jobXP;
    this.jobXpLevelFloor = jobXpLevelFloor;
    this.jobXpNextLevelFloor = jobXpNextLevelFloor;
  }
}
