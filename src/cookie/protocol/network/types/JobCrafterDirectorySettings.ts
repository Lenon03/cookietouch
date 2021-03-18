import Type from "@/protocol/network/types/Type";

export default class JobCrafterDirectorySettings extends Type {

  public jobid: number;
  public minslot: number;
  public userdefinedparams: number;

  constructor(jobid = 0, minslot = 0, userdefinedparams = 0) {
    super();
    this.jobid = jobid;
    this.minslot = minslot;
    this.userdefinedparams = userdefinedparams;
  }
}
