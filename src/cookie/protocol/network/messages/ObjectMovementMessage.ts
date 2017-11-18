import Message from "./Message";
export default class ObjectMovementMessage extends Message {
public objectUID: number;
public position: number;
constructor(objectUID = 0, position = 63) {
super();
this.objectUID = objectUID;
this.position = position;

}
}
