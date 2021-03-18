import HumanOption from "@/protocol/network/types/HumanOption";

export default class HumanOptionEmote extends HumanOption {
  public emoteId: number;
  public emoteStartTime: number;

  constructor(emoteId = 0, emoteStartTime = 0) {
    super();
    this.emoteId = emoteId;
    this.emoteStartTime = emoteStartTime;

  }
}
