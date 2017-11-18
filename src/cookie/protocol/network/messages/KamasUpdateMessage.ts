import Message from "./Message";
export default class KamasUpdateMessage extends Message {
public kamasTotal: number;
constructor(kamasTotal = 0) {
super();
this.kamasTotal = kamasTotal;

}
}
