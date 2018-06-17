import JobCrafterDirectoryListEntry from "@protocol/network/types/JobCrafterDirectoryListEntry";
import Message from "./Message";

export default class JobCrafterDirectoryAddMessage extends Message {
  public listEntry: JobCrafterDirectoryListEntry;

  constructor(listEntry: JobCrafterDirectoryListEntry) {
    super();
    this.listEntry = listEntry;

  }
}
