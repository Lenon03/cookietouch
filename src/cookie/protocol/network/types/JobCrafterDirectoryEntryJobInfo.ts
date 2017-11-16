export default class JobCrafterDirectoryEntryJobInfo {

  public jobId: number;
  public jobLevel: number;
  public userDefinedParams: number;
  public minSlots: number;

  constructor(jobId = 0, jobLevel = 0, userDefinedParams = 0, minSlots = 0) {
    this.jobId = jobId;
    this.jobLevel = jobLevel;
    this.userDefinedParams = userDefinedParams;
    this.minSlots = minSlots;
  }
}
