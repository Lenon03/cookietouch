import JobCrafterDirectorySettings from "@/protocol/network/types/JobCrafterDirectorySettings";
import Message from "@/protocol/network/messages/Message";

export default class JobCrafterDirectorySettingsMessage extends Message {
  public craftersSettings: JobCrafterDirectorySettings[];

  constructor(craftersSettings: JobCrafterDirectorySettings[]) {
    super();
    this.craftersSettings = craftersSettings;

  }
}
