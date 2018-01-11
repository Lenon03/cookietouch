import BidExtension from "@/extensions/bid/BidExtension";
import FloodExtension from "@/extensions/flood/FloodExtension";
import Account from "@account";
import IClearable from "@utils/IClearable";
import CharacterCreatorExtension from "./characterCreator/CharacterCreatorExtension";
import RolePlayExtension from "./exchanges/RolePlayExtension";
import FightsExtension from "./fights/FightsExtension";

export default class Extensions implements IClearable {
  public roleplay: RolePlayExtension;
  public fights: FightsExtension;
  public characterCreation: CharacterCreatorExtension;
  public flood: FloodExtension;
  public bid: BidExtension;

  constructor(account: Account) {
    this.fights = new FightsExtension(account);
    this.roleplay = new RolePlayExtension(account);
    this.characterCreation = new CharacterCreatorExtension(account);
    this.bid = new BidExtension(account);
    this.flood = new FloodExtension(account);
  }

  public clear() {
    this.fights.clear();
    this.bid.clear();
    this.characterCreation.clear();
  }
}
