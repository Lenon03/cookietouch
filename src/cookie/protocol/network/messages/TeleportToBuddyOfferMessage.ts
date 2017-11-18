import Message from "./Message";
export default class TeleportToBuddyOfferMessage extends Message {
public dungeonId: number;
public buddyId: number;
public timeLeft: number;
constructor(dungeonId = 0, buddyId = 0, timeLeft = 0) {
super();
this.dungeonId = dungeonId;
this.buddyId = buddyId;
this.timeLeft = timeLeft;

}
}
