import BasicCharactersListMessage from "@/protocol/network/messages/BasicCharactersListMessage";
import CharacterBaseInformations from "@/protocol/network/types/CharacterBaseInformations";

export default class CharactersListMessage extends BasicCharactersListMessage {
  public hasStartupActions: boolean;

  constructor(hasStartupActions = false, characters: CharacterBaseInformations[]) {
    super(characters);
    this.hasStartupActions = hasStartupActions;

  }
}
