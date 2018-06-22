import Message from "@/protocol/network/messages/Message";

export default class AlignmentRankUpdateMessage extends Message {
  public alignmentRank: number;
  public verbose: boolean;

  constructor(alignmentRank = 0, verbose = false) {
    super();
    this.alignmentRank = alignmentRank;
    this.verbose = verbose;

  }
}
