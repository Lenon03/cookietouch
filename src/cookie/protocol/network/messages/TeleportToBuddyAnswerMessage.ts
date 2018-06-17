import Message from "./Message";

export default class TeleportToBuddyAnswerMessage extends Message {
  public dungeonId: number;
  public buddyId: number;
  public accept: boolean;

  constructor(dungeonId = 0, buddyId = 0, accept = false) {
    super();
    this.dungeonId = dungeonId;
    this.buddyId = buddyId;
    this.accept = accept;

  }
}
