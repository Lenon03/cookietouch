import JobCrafterDirectoryListEntry from "@/protocol/network/types/JobCrafterDirectoryListEntry";
import Message from "@/protocol/network/messages/Message";

export default class JobCrafterDirectoryAddMessage extends Message {
  public listEntry: JobCrafterDirectoryListEntry;

  constructor(listEntry: JobCrafterDirectoryListEntry) {
    super();
    this.listEntry = listEntry;

  }
}
