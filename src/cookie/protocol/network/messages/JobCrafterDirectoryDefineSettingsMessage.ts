import Message from "@/protocol/network/messages/Message";
import JobCrafterDirectorySettings from "@/protocol/network/types/JobCrafterDirectorySettings";

export default class JobCrafterDirectoryDefineSettingsMessage extends Message {
  public settings: JobCrafterDirectorySettings;

  constructor(settings: JobCrafterDirectorySettings) {
    super();
    this.settings = settings;

  }
}
