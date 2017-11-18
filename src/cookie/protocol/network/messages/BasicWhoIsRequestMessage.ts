import Message from "./Message";
export default class BasicWhoIsRequestMessage extends Message {
public verbose: boolean;
public search: string;
constructor(verbose = false, search = "") {
super();
this.verbose = verbose;
this.search = search;

}
}
