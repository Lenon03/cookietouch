import Account from "@account";
import IClearable from "@utils/IClearable";
import CharacterCreatorExtension from "./characterCreator/CharacterCreatorExtension";
import RolePlayExtension from "./exchanges/RolePlayExtension";
import FightsExtension from "./fights/FightsExtension";

export default class Extensions implements IClearable {
  public roleplay: RolePlayExtension;
  public fights: FightsExtension;
  public characterCreation: CharacterCreatorExtension;

  constructor(account: Account) {
    this.fights = new FightsExtension(account);
    this.roleplay = new RolePlayExtension(account);
    this.characterCreation = new CharacterCreatorExtension(account);
  }

  public clear() {
    this.fights.clear();
    this.characterCreation.clear();
  }
}
