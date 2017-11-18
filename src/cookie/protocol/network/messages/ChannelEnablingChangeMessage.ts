import Message from "./Message";
export default class ChannelEnablingChangeMessage extends Message {
public channel: number;
public enable: boolean;
constructor(channel = 0, enable = false) {
super();
this.channel = channel;
this.enable = enable;

}
}
