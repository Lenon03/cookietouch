import MovementsManager from "../utils/MovementsManager";
import { Account } from "./Account";
import { CharacterState } from "./CharacterState";
import Map from "./Map";

export default class Character {

  public state: CharacterState;
  public movementsManager: MovementsManager;
  public map: Map;
  public cellId: number;
  public restrictions: any;
  public stats: any;
  public infos: any;

  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.state = CharacterState.IDLE;
    this.movementsManager = new MovementsManager(this.account);
    this.map = new Map(this.account);

    this.register();
  }

  private register() {
    this.account.dispatcher.register("SetCharacterRestrictionsMessage",
                this.HandleSetCharacterRestrictionsMessage, this);
    this.account.dispatcher.register("CharacterStatsListMessage",
                this.HandleCharacterStatsListMessage, this);
  }

  private HandleSetCharacterRestrictionsMessage(account: Account, data: any) {
    account.character.restrictions = data.restrictions;
  }

  private HandleCharacterStatsListMessage(account: Account, data: any) {
    account.character.stats = data.stats;
  }
}
