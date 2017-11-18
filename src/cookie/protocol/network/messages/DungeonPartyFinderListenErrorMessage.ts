import Message from "./Message";
export default class DungeonPartyFinderListenErrorMessage extends Message {
public dungeonId: number;
constructor(dungeonId = 0) {
super();
this.dungeonId = dungeonId;

}
}
