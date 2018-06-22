import Message from "@/protocol/network/messages/Message";

export default class ChallengeTargetsListMessage extends Message {
  public targetIds: number[];
  public targetCells: number[];

  constructor(targetIds: number[], targetCells: number[]) {
    super();
    this.targetIds = targetIds;
    this.targetCells = targetCells;

  }
}
