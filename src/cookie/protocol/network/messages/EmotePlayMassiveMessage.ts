import EmotePlayAbstractMessage from "./EmotePlayAbstractMessage";
export default class EmotePlayMassiveMessage extends EmotePlayAbstractMessage {
public actorIds: number[];
constructor(emoteId = 0, emoteStartTime = 0, actorIds: number[]) {
super(emoteId, emoteStartTime );
this.actorIds = actorIds;

}
}
