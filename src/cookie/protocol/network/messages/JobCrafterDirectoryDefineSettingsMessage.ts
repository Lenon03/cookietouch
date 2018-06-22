import JobCrafterDirectorySettings from "@/protocol/network/types/JobCrafterDirectorySettings";
import Message from "@/protocol/network/messages/Message";

export default class JobCrafterDirectoryDefineSettingsMessage extends Message {
  public settings: JobCrafterDirectorySettings;

  constructor(settings: JobCrafterDirectorySettings) {
    super();
    this.settings = settings;

  }
}
