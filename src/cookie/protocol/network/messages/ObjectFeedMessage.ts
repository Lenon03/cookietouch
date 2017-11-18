import Message from "./Message";
export default class ObjectFeedMessage extends Message {
public objectUID: number;
public foodUID: number;
public foodQuantity: number;
constructor(objectUID = 0, foodUID = 0, foodQuantity = 0) {
super();
this.objectUID = objectUID;
this.foodUID = foodUID;
this.foodQuantity = foodQuantity;

}
}
