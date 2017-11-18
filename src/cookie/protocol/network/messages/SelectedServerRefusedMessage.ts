import Message from "./Message";
export default class SelectedServerRefusedMessage extends Message {
public serverId: number;
public error: number;
public serverStatus: number;
constructor(serverId = 0, error = 1, serverStatus = 1) {
super();
this.serverId = serverId;
this.error = error;
this.serverStatus = serverStatus;

}
}
