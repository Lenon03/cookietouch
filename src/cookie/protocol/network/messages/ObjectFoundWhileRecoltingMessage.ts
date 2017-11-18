import Message from "./Message";
export default class ObjectFoundWhileRecoltingMessage extends Message {
public genericId: number;
public quantity: number;
public ressourceGenericId: number;
constructor(genericId = 0, quantity = 0, ressourceGenericId = 0) {
super();
this.genericId = genericId;
this.quantity = quantity;
this.ressourceGenericId = ressourceGenericId;

}
}
