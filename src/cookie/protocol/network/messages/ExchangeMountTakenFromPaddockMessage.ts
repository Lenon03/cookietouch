import Message from "./Message";
export default class ExchangeMountTakenFromPaddockMessage extends Message {
public name: string;
public worldX: number;
public worldY: number;
public ownername: string;
constructor(name = "", worldX = 0, worldY = 0, ownername = "") {
super();
this.name = name;
this.worldX = worldX;
this.worldY = worldY;
this.ownername = ownername;

}
}
