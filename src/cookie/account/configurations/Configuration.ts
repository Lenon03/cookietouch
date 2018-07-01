import Account from "@/account";
import SpellToBoostEntry from "@/account/configurations/SpellToBoostEntry";
import { BoostableStats } from "@/game/character/BoostableStats";
import firebase from "firebase";

interface IConfigurationJSON {
  showGeneralMessages: boolean;
  showPartyMessages: boolean;
  showGuildMessages: boolean;
  showAllianceMessages: boolean;
  showSaleMessages: boolean;
  showSeekMessages: boolean;
  showNoobMessages: boolean;
  autoRegenAccepted: boolean;
  acceptAchievements: boolean;
  statToBoost: BoostableStats;
  ignoreNonAuthorizedTrades: boolean;
  disconnectUponFightsLimit: boolean;
  spellsToBoost: SpellToBoostEntry[];
  autoMount: boolean;
  authorizedTradesFrom: number[];
  enableSpeedHack: boolean;
}

export default class Configuration {
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

  public async load() {
    const user = firebase.auth().currentUser;
    if (!user) {
      return;
    }
    const globalDoc = firebase
      .firestore()
      .doc(
        `users/${user.uid}/config/accounts/${
          this.account.accountConfig.username
        }/characters/${this.account.game.character.name}/global`
      );

    const data = await globalDoc.get();
    if (!data.exists) {
      return;
    }
    const json = data.data() as IConfigurationJSON;
    this.acceptAchievements = json.acceptAchievements;
    this.autoMount = json.autoMount;
    this.authorizedTradesFrom = json.authorizedTradesFrom;
    this.autoRegenAccepted = json.autoRegenAccepted;
    this.disconnectUponFightsLimit = json.disconnectUponFightsLimit;
    this.enableSpeedHack = json.enableSpeedHack;
    this.ignoreNonAuthorizedTrades = json.ignoreNonAuthorizedTrades;
    this.showAllianceMessages = json.showAllianceMessages;
    this.showGeneralMessages = json.showGeneralMessages;
    this.showGuildMessages = json.showGuildMessages;
    this.showNoobMessages = json.showNoobMessages;
    this.showPartyMessages = json.showPartyMessages;
    this.showSaleMessages = json.showSaleMessages;
    this.showSeekMessages = json.showSeekMessages;
    this.spellsToBoost = json.spellsToBoost;
    this.statToBoost = json.statToBoost;
  }

  public async save() {
    const toSave: IConfigurationJSON = {
      acceptAchievements: this.acceptAchievements,
      authorizedTradesFrom: this.authorizedTradesFrom,
      autoMount: this.autoMount,
      autoRegenAccepted: this.autoRegenAccepted,
      disconnectUponFightsLimit: this.disconnectUponFightsLimit,
      enableSpeedHack: this.enableSpeedHack,
      ignoreNonAuthorizedTrades: this.ignoreNonAuthorizedTrades,
      showAllianceMessages: this.showAllianceMessages,
      showGeneralMessages: this.showGeneralMessages,
      showGuildMessages: this.showGuildMessages,
      showNoobMessages: this.showNoobMessages,
      showPartyMessages: this.showPartyMessages,
      showSaleMessages: this.showSaleMessages,
      showSeekMessages: this.showSeekMessages,
      spellsToBoost: this.spellsToBoost,
      statToBoost: this.statToBoost
    };
    const user = firebase.auth().currentUser;
    const globalDoc = firebase
      .firestore()
      .doc(
        `users/${user.uid}/config/accounts/${
          this.account.accountConfig.username
        }/characters/${this.account.game.character.name}/global`
      );

    await globalDoc.set(toSave);
  }
}
