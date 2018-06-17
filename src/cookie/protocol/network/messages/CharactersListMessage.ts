import CharacterBaseInformations from "@protocol/network/types/CharacterBaseInformations";
import BasicCharactersListMessage from "./BasicCharactersListMessage";

export default class CharactersListMessage extends BasicCharactersListMessage {
  public hasStartupActions: boolean;

  constructor(hasStartupActions = false, characters: CharacterBaseInformations[]) {
    super(characters);
    this.hasStartupActions = hasStartupActions;

  }
}
