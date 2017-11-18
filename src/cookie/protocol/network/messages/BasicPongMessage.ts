import Message from "./Message";
export default class BasicPongMessage extends Message {
public quiet: boolean;
constructor(quiet = false) {
super();
this.quiet = quiet;

}
}
