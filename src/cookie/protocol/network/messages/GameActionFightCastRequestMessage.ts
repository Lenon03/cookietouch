import Message from "./Message";
export default class GameActionFightCastRequestMessage extends Message {
public spellId: number;
public cellId: number;
constructor(spellId = 0, cellId = 0) {
super();
this.spellId = spellId;
this.cellId = cellId;

}
}
