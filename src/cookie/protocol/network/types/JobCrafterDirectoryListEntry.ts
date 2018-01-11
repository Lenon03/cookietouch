import JobCrafterDirectoryEntryJobInfo from "./JobCrafterDirectoryEntryJobInfo";
import JobCrafterDirectoryEntryPlayerInfo from "./JobCrafterDirectoryEntryPlayerInfo";
import Type from "./Type";

export default class JobCrafterDirectoryListEntry extends Type {

  public playerInfo: JobCrafterDirectoryEntryPlayerInfo;
  public jobInfo: JobCrafterDirectoryEntryJobInfo;

  constructor(playerInfo: JobCrafterDirectoryEntryPlayerInfo,
              jobInfo: JobCrafterDirectoryEntryJobInfo) {
    super();
    this.playerInfo = playerInfo;
    this.playerInfo = playerInfo;
    this.jobInfo = jobInfo;
    this.jobInfo = jobInfo;
  }
}
