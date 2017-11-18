import Message from "./Message";
export default class SpellForgetUIMessage extends Message {
public open: boolean;
constructor(open = false) {
super();
this.open = open;

}
}
