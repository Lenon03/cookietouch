import JobCrafterDirectoryEntryJobInfo from "./JobCrafterDirectoryEntryJobInfo";
import JobCrafterDirectoryEntryPlayerInfo from "./JobCrafterDirectoryEntryPlayerInfo";

export default class JobCrafterDirectoryListEntry {

  public playerInfo: JobCrafterDirectoryEntryPlayerInfo;
  public jobInfo: JobCrafterDirectoryEntryJobInfo;

  constructor(playerInfo: JobCrafterDirectoryEntryPlayerInfo,
              jobInfo: JobCrafterDirectoryEntryJobInfo) {
    this.playerInfo = playerInfo;
    this.playerInfo = playerInfo;
    this.jobInfo = jobInfo;
    this.jobInfo = jobInfo;
  }
}
