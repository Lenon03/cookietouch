import JobCrafterDirectoryEntryJobInfo from "@/protocol/network/types/JobCrafterDirectoryEntryJobInfo";
import JobCrafterDirectoryEntryPlayerInfo from "@/protocol/network/types/JobCrafterDirectoryEntryPlayerInfo";
import Type from "@/protocol/network/types/Type";

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
