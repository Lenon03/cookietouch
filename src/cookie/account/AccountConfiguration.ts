import { BoostableStats } from "@game/character/BoostableStats";
import { Enumerable, List } from "linqts";
import CharacterCreation from "./CharacterCreation";
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
  public characterCreation: CharacterCreation;
  public autoMount: boolean;
  public planificationActivated: boolean;
  public planification: List<boolean>;
  public enableSpeedHack: boolean;

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
    this.disconnectUponFightsLimit = false;
    this.spellsToBoost = new Array<SpellToBoostEntry>();
    this.authorizedTradesFrom = [];
    this.characterCreation = new CharacterCreation();
    this.autoMount = true;
    this.planificationActivated = false;
    this.planification = Enumerable.Repeat(true, 24);
    this.enableSpeedHack = false;
  }
}
