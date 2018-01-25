import { ChatChannelsMultiEnum } from "@/protocol/enums/ChatChannelsMultiEnum";

export default class FloodSentence {
  public content: string;
  public channel: ChatChannelsMultiEnum;
  public onPlayerJoined: boolean;
  public onPlayerLeft: boolean;

  constructor(content: string, channel: ChatChannelsMultiEnum, onPlayerJoined: boolean, onPlayerLeft: boolean) {
    this.content = content;
    this.channel = channel;
    this.onPlayerJoined = onPlayerJoined;
    this.onPlayerLeft = onPlayerLeft;
  }
}
