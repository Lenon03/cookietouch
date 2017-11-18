import CharacterSelectionMessage from "./CharacterSelectionMessage";
export default class CharacterFirstSelectionMessage extends CharacterSelectionMessage {
  public doTutorial: boolean;
  constructor(id = 0, doTutorial = false) {
    super(id);
    this.doTutorial = doTutorial;

  }
}
