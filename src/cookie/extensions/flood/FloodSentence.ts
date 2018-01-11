import { ChatActivableChannelsEnum } from "@/protocol/enums/ChatActivableChannelsEnum";

export default class FloodSentence {
  public content: string;
  public channel: ChatActivableChannelsEnum;
  public onPlayerJoined: boolean;
  public onPlayerLeft: boolean;

  constructor(content: string, channel: ChatActivableChannelsEnum, onPlayerJoined: boolean, onPlayerLeft: boolean) {
    this.content = content;
    this.channel = channel;
    this.onPlayerJoined = onPlayerJoined;
    this.onPlayerLeft = onPlayerLeft;
  }
}
