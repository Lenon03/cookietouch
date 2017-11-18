import Message from "./Message";
export default class UpdateSelfAgressableStatusMessage extends Message {
public status: number;
public probationTime: number;
constructor(status = 0, probationTime = 0) {
super();
this.status = status;
this.probationTime = probationTime;

}
}
