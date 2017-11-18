import Message from "./Message";
export default class LockableCodeResultMessage extends Message {
public result: number;
constructor(result = 0) {
super();
this.result = result;

}
}
