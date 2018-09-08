import Account from "@/account";
import SpellToBoostEntry, {
  ISpellToBoostEntry
} from "@/account/configurations/SpellToBoostEntry";
import { BoostableStats } from "@/game/character/BoostableStats";
import LiteEvent, { ILiteEvent } from "@/utils/LiteEvent";
import firebase from "firebase/app";

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
  spellsToBoost: ISpellToBoostEntry[];
  autoMount: boolean;
  authorizedTradesFrom: number[];
  enableSpeedHack: boolean;
  antiAgro: boolean;
}

export default class Configuration implements IConfigurationJSON {
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
  public antiAgro: boolean;

  private authChangedUnsuscribe: firebase.Unsubscribe;
  private stopDataSnapshot: () => void;

  private globalDoc: firebase.firestore.DocumentReference;

  private readonly onUpdated = new LiteEvent<void>();

  public get Updated(): ILiteEvent<void> {
    return this.onUpdated.expose();
  }

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
    this.antiAgro = true;
  }

  public removeListeners = () => {
    if (this.authChangedUnsuscribe) {
      this.authChangedUnsuscribe();
    }
    if (this.stopDataSnapshot) {
      this.stopDataSnapshot();
    }
  };

  public async load() {
    this.authChangedUnsuscribe = firebase
      .auth()
      .onAuthStateChanged(async user => {
        if (!user) {
          return;
        }
        this.globalDoc = firebase
          .firestore()
          .doc(
            `users/${user.uid}/config/accounts/${
              this.account.accountConfig.username
            }/characters/${this.account.game.character.name}/global`
          );

        this.stopDataSnapshot = this.globalDoc.onSnapshot(snapshot => {
          this.updateFields(snapshot);
        });
      });

    if (!this.globalDoc) {
      return;
    }
    const data = await this.globalDoc.get();
    this.updateFields(data);
  }

  public async save() {
    const toSave: IConfigurationJSON = {
      acceptAchievements: this.acceptAchievements,
      antiAgro: this.antiAgro,
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
      spellsToBoost: this.spellsToBoost.map(o => o.toJSON()),
      statToBoost: this.statToBoost
    };

    await this.globalDoc.set(toSave);
  }

  private updateFields(snapshot: firebase.firestore.DocumentSnapshot) {
    if (!snapshot.exists) {
      return;
    }
    const json = snapshot.data() as IConfigurationJSON;
    this.acceptAchievements = json.acceptAchievements;
    this.antiAgro = !!json.antiAgro;
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
    this.spellsToBoost = json.spellsToBoost.map(o =>
      SpellToBoostEntry.fromJSON(o)
    );
    this.statToBoost = json.statToBoost;
    this.onUpdated.trigger();
  }
}
