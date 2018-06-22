import Message from "@/protocol/network/messages/Message";

export default class ChallengeTargetUpdateMessage extends Message {
  public challengeId: number;
  public targetId: number;

  constructor(challengeId = 0, targetId = 0) {
    super();
    this.challengeId = challengeId;
    this.targetId = targetId;

  }
}
