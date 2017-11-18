import CharacterReplayRequestMessage from "./CharacterReplayRequestMessage";
export default class CharacterReplayWithRelookRequestMessage extends CharacterReplayRequestMessage {
public cosmeticId: number;
constructor(characterId = 0, cosmeticId = 0) {
super(characterId );
this.cosmeticId = cosmeticId;

}
}
