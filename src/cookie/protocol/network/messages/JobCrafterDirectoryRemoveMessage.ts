import Message from "./Message";
export default class JobCrafterDirectoryRemoveMessage extends Message {
public jobId: number;
public playerId: number;
constructor(jobId = 0, playerId = 0) {
super();
this.jobId = jobId;
this.playerId = playerId;

}
}
