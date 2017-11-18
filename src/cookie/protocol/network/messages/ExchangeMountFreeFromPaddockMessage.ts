import Message from "./Message";
export default class ExchangeMountFreeFromPaddockMessage extends Message {
public name: string;
public worldX: number;
public worldY: number;
public liberator: string;
constructor(name = "", worldX = 0, worldY = 0, liberator = "") {
super();
this.name = name;
this.worldX = worldX;
this.worldY = worldY;
this.liberator = liberator;

}
}
