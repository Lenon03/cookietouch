import Message from "./Message";
export default class ShortcutBarRemoveRequestMessage extends Message {
public barType: number;
public slot: number;
constructor(barType = 0, slot = 0) {
super();
this.barType = barType;
this.slot = slot;

}
}
