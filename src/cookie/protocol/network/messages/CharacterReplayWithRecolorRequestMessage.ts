import CharacterReplayRequestMessage from "@/protocol/network/messages/CharacterReplayRequestMessage";

export default class CharacterReplayWithRecolorRequestMessage extends CharacterReplayRequestMessage {
  public indexedColor: number[];

  constructor(characterId = 0, indexedColor: number[]) {
    super(characterId);
    this.indexedColor = indexedColor;

  }
}
