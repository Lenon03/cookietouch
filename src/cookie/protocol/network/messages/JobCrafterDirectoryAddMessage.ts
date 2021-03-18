import Message from "@/protocol/network/messages/Message";
import JobCrafterDirectoryListEntry from "@/protocol/network/types/JobCrafterDirectoryListEntry";

export default class JobCrafterDirectoryAddMessage extends Message {
  public listEntry: JobCrafterDirectoryListEntry;

  constructor(listEntry: JobCrafterDirectoryListEntry) {
    super();
    this.listEntry = listEntry;

  }
}
