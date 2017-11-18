import ObjectItem from "@protocol/network/types/ObjectItem";
import Message from "./Message";
export default class StorageObjectsUpdateMessage extends Message {
public objectList: ObjectItem[];
constructor(objectList: ObjectItem[]) {
super();
this.objectList = objectList;

}
}
