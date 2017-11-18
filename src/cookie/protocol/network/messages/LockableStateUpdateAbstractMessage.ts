import Message from "./Message";
export default class LockableStateUpdateAbstractMessage extends Message {
public locked: boolean;
constructor(locked = false) {
super();
this.locked = locked;

}
}
