import { BoostableStats } from "./game/character/BoostableStats";
import SpellToBoostEntry from "./SpellToBoostEntry";

export default class AccountConfiguration {
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
  public authorizedTradesFrom: number[];

  constructor() {
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
    this.disconnectUponFightsLimit = true;
    this.spellsToBoost = new Array<SpellToBoostEntry>();
    this.authorizedTradesFrom = [];
  }
}
