import Message from "./Message";
export default class MountEmoteIconUsedOkMessage extends Message {
public mountId: number;
public reactionType: number;
constructor(mountId = 0, reactionType = 0) {
super();
this.mountId = mountId;
this.reactionType = reactionType;

}
}
