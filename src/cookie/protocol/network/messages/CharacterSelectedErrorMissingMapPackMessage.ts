import CharacterSelectedErrorMessage from "./CharacterSelectedErrorMessage";

export default class CharacterSelectedErrorMissingMapPackMessage extends CharacterSelectedErrorMessage {
  public subAreaId: number;

  constructor(subAreaId = 0) {
    super();
    this.subAreaId = subAreaId;

  }
}
