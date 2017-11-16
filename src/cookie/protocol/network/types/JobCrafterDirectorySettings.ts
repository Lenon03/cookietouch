export default class JobCrafterDirectorySettings {

  public jobid: number;
  public minslot: number;
  public userdefinedparams: number;

  constructor(jobid = 0, minslot = 0, userdefinedparams = 0) {
    this.jobid = jobid;
    this.minslot = minslot;
    this.userdefinedparams = userdefinedparams;
  }
}
