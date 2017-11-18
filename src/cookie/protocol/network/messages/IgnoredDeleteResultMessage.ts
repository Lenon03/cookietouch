import Message from "./Message";
export default class IgnoredDeleteResultMessage extends Message {
public success: boolean;
public name: string;
public session: boolean;
constructor(success = false, name = "", session = false) {
super();
this.success = success;
this.name = name;
this.session = session;

}
}
