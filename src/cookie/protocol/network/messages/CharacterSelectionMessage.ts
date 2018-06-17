import Message from "./Message";

export default class CharacterSelectionMessage extends Message {
  public id: number;

  constructor(id = 0) {
    super();
    this.id = id;

  }
}
