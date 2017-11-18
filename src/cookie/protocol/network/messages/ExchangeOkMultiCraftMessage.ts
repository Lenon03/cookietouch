import Message from "./Message";
export default class ExchangeOkMultiCraftMessage extends Message {
public initiatorId: number;
public otherId: number;
public role: number;
constructor(initiatorId = 0, otherId = 0, role = 0) {
super();
this.initiatorId = initiatorId;
this.otherId = otherId;
this.role = role;

}
}
