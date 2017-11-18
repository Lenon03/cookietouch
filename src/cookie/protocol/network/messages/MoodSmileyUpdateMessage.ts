import Message from "./Message";
export default class MoodSmileyUpdateMessage extends Message {
public accountId: number;
public playerId: number;
public smileyId: number;
constructor(accountId = 0, playerId = 0, smileyId = 0) {
super();
this.accountId = accountId;
this.playerId = playerId;
this.smileyId = smileyId;

}
}
