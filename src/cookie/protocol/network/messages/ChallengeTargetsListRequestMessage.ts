import Message from "@/protocol/network/messages/Message";

export default class ChallengeTargetsListRequestMessage extends Message {
  public challengeId: number;

  constructor(challengeId = 0) {
    super();
    this.challengeId = challengeId;

  }
}
