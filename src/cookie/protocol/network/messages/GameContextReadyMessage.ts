import Message from "./Message";
export default class GameContextReadyMessage extends Message {
public mapId: number;
constructor(mapId = 0) {
super();
this.mapId = mapId;

}
}
