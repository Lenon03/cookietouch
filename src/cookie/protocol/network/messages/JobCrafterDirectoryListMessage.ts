import Message from "@/protocol/network/messages/Message";
import JobCrafterDirectoryListEntry from "@/protocol/network/types/JobCrafterDirectoryListEntry";

export default class JobCrafterDirectoryListMessage extends Message {
  public listEntries: JobCrafterDirectoryListEntry[];

  constructor(listEntries: JobCrafterDirectoryListEntry[]) {
    super();
    this.listEntries = listEntries;

  }
}
