import Message from "./Message";
export default class BasicWhoAmIRequestMessage extends Message {
public verbose: boolean;
constructor(verbose = false) {
super();
this.verbose = verbose;

}
}
