import Message from "./Message";
export default class PrismWorldInformationRequestMessage extends Message {
public join: boolean;
constructor(join = false) {
super();
this.join = join;

}
}
