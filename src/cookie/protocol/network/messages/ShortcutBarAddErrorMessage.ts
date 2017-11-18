import Message from "./Message";
export default class ShortcutBarAddErrorMessage extends Message {
public error: number;
constructor(error = 0) {
super();
this.error = error;

}
}
