import JobCrafterDirectoryListEntry from "@protocol/network/types/JobCrafterDirectoryListEntry";
import Message from "./Message";
export default class JobCrafterDirectoryListMessage extends Message {
public listEntries: JobCrafterDirectoryListEntry[];
constructor(listEntries: JobCrafterDirectoryListEntry[]) {
super();
this.listEntries = listEntries;

}
}
