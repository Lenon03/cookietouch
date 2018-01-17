import Account from "@/account";
import { BoostableStats } from "@game/character/BoostableStats";
import * as path from "path";
import SpellToBoostEntry from "./SpellToBoostEntry";

export default class Configuration {
  public readonly configurationsPath = "parameters";

  public showGeneralMessages: boolean;
  public showPartyMessages: boolean;
  public showGuildMessages: boolean;
  public showAllianceMessages: boolean;
  public showSaleMessages: boolean;
  public showSeekMessages: boolean;
  public showNoobMessages: boolean;
  public autoRegenAccepted: boolean;
  public acceptAchievements: boolean;
  public statToBoost: BoostableStats;
  public ignoreNonAuthorizedTrades: boolean;
  public disconnectUponFightsLimit: boolean;
  public spellsToBoost: SpellToBoostEntry[];
  public autoMount: boolean;
  public authorizedTradesFrom: number[];
  public enableSpeedHack: boolean;

  private account: Account;

  constructor(account: Account) {
    this.account = account;

    this.showGeneralMessages = true;
    this.showPartyMessages = true;
    this.showGuildMessages = true;
    this.showAllianceMessages = true;
    this.showSaleMessages = true;
    this.showSeekMessages = true;
    this.showNoobMessages = true;
    this.autoRegenAccepted = true;
    this.acceptAchievements = true;
    this.statToBoost = BoostableStats.NONE;
    this.ignoreNonAuthorizedTrades = false;
    this.disconnectUponFightsLimit = false;
    this.spellsToBoost = new Array<SpellToBoostEntry>();
    this.autoMount = true;
    this.authorizedTradesFrom = [];
    this.enableSpeedHack = false;
  }

  public load() {
    // TODO: ...
  }

  public save() {
    // TODO: ...
  }
}
