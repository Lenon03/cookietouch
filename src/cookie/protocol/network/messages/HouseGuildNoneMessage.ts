import Message from "./Message";
export default class HouseGuildNoneMessage extends Message {
public houseId: number;
constructor(houseId = 0) {
super();
this.houseId = houseId;

}
}
