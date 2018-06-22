import CharacterSelectionMessage from "@/protocol/network/messages/CharacterSelectionMessage";

export default class CharacterSelectionWithRenameMessage extends CharacterSelectionMessage {
  public name: string;

  constructor(id = 0, name = "") {
    super(id);
    this.name = name;

  }
}
