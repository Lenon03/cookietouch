import Message from "./Message";
export default class ChallengeResultMessage extends Message {
public challengeId: number;
public success: boolean;
constructor(challengeId = 0, success = false) {
super();
this.challengeId = challengeId;
this.success = success;

}
}
