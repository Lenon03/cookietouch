import Managers from "../managers";
import Account from "./Account";
import { CharacterState } from "./CharacterState";
import Inventory from "./Inventory";
import Map from "./Map";
import Spell from "./Spell";

export default class Character {

  public state: CharacterState;
  public managers: Managers;
  public map: Map;
  public cellId: number;
  public restrictions: any;
  public stats: any;
  public infos: any;
  public inventory: Inventory;
  public spells: Spell[];
  public weight: number;
  public weightMax: number;

  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.state = CharacterState.IDLE;
    this.managers = new Managers(this.account);
    this.map = new Map(this.account);
    this.inventory = new Inventory(this.account);
    this.register();
  }

  private register() {
    this.account.dispatcher.register("SetCharacterRestrictionsMessage",
                this.HandleSetCharacterRestrictionsMessage, this);
    this.account.dispatcher.register("CharacterStatsListMessage",
                this.HandleCharacterStatsListMessage, this);
    this.account.dispatcher.register("SpellListMessage",
                this.HandleSpellListMessage, this);
  }

  private HandleSetCharacterRestrictionsMessage(account: Account, data: any) {
    account.character.restrictions = data.restrictions;
  }

  private HandleCharacterStatsListMessage(account: Account, data: any) {
    account.character.stats = data.stats;
  }
  private HandleSpellListMessage(account: Account, data: any) {
    account.character.spells = data.spells;
  }
}
