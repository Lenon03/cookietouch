import Message from "./Message";
export default class ExchangeOnHumanVendorRequestMessage extends Message {
public humanVendorId: number;
public humanVendorCell: number;
constructor(humanVendorId = 0, humanVendorCell = 0) {
super();
this.humanVendorId = humanVendorId;
this.humanVendorCell = humanVendorCell;

}
}
