import EntityLook from "@protocol/network/types/EntityLook";
import JobCrafterDirectoryEntryJobInfo from "@protocol/network/types/JobCrafterDirectoryEntryJobInfo";
import JobCrafterDirectoryEntryPlayerInfo from "@protocol/network/types/JobCrafterDirectoryEntryPlayerInfo";
import Message from "./Message";
export default class JobCrafterDirectoryEntryMessage extends Message {
public jobInfoList: JobCrafterDirectoryEntryJobInfo[];
public playerInfo: JobCrafterDirectoryEntryPlayerInfo;
public playerLook: EntityLook;
constructor(playerInfo: JobCrafterDirectoryEntryPlayerInfo, playerLook: EntityLook, jobInfoList: JobCrafterDirectoryEntryJobInfo[]) {
super();
this.jobInfoList = jobInfoList;
this.playerInfo = playerInfo;
this.playerLook = playerLook;

}
}
