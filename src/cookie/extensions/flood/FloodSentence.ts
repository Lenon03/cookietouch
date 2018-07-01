import { ChatChannelsMultiEnum } from "@/protocol/enums/ChatChannelsMultiEnum";

export interface IFloodSentence {
  content: string;
  channel: ChatChannelsMultiEnum;
  onPlayerJoined: boolean;
  onPlayerLeft: boolean;
}

export default class FloodSentence implements IFloodSentence {
  public content: string;
  public channel: ChatChannelsMultiEnum;
  public onPlayerJoined: boolean;
  public onPlayerLeft: boolean;

  constructor(
    content: string,
    channel: ChatChannelsMultiEnum,
    onPlayerJoined: boolean,
    onPlayerLeft: boolean
  ) {
    this.content = content;
    this.channel = channel;
    this.onPlayerJoined = onPlayerJoined;
    this.onPlayerLeft = onPlayerLeft;
  }

  public toJSON(): IFloodSentence {
    return Object.assign({}, this, {});
  }

  public static fromJSON(json: IFloodSentence | string): FloodSentence {
    if (typeof json === "string") {
      return JSON.parse(json, FloodSentence.reviver);
    } else {
      const accountConfiguration = Object.create(FloodSentence.prototype);
      return {
        ...accountConfiguration,
        ...json
      };
    }
  }

  public static reviver(key: string, value: string): any {
    return key === "" ? FloodSentence.fromJSON(value) : value;
  }
}
