import Account from "@account";
import IClearable from "@utils/IClearable";
import RolePlayExtension from "./exchanges/RolePlayExtension";
import FightsExtension from "./fights/FightsExtension";

export default class Extensions implements IClearable {
  public roleplay: RolePlayExtension;
  public fights: FightsExtension;

  constructor(account: Account) {
    this.fights = new FightsExtension(account);
    this.roleplay = new RolePlayExtension(account);
  }

  public clear() {
    this.fights.clear();
  }
}
