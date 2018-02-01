import CharacterSelectionMessage from "./CharacterSelectionMessage";

export default class CharacterSelectionWithRecolorMessage extends CharacterSelectionMessage {
  public indexedColor: number[];

  constructor(id = 0, indexedColor: number[]) {
    super(id);
    this.indexedColor = indexedColor;

  }
}
