import Account from "@/account";
import ObjectToSellEntry, {
  IObjectToSellEntry
} from "@/extensions/bid/ObjectToSellEntry";
import LiteEvent from "@/utils/LiteEvent";
import { isBlank } from "@/utils/String";
import firebase from "firebase";
import { List } from "linqts";

interface IBidConfigurationJSON {
  interval: number;
  scriptPath: string;
  objectsToSell: IObjectToSellEntry[];
}

export default class BidConfiguration {
  public interval: number;
  public scriptPath: string;
  public objectsToSell: List<ObjectToSellEntry>;
  private account: Account;

  private authChangedUnsuscribe: firebase.Unsubscribe;
  private stopDataSnapshot: () => void;

  private globalDoc: firebase.firestore.DocumentReference;

  private readonly onChanged = new LiteEvent<void>();

  constructor(account: Account) {
    this.account = account;
    this.interval = 10;
    this.scriptPath = "";
    this.objectsToSell = new List();
  }

  public removeListeners = () => {
    if (this.authChangedUnsuscribe) {
      this.authChangedUnsuscribe();
    }
    if (this.stopDataSnapshot) {
      this.stopDataSnapshot();
    }
  };

  get isScriptPathValid(): boolean {
    return !isBlank(this.scriptPath);
  }

  public get Changed() {
    return this.onChanged.expose();
  }

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
            }/characters/${this.account.game.character.name}/bid`
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
    const toSave: IBidConfigurationJSON = {
      interval: this.interval,
      objectsToSell: this.objectsToSell.ToArray().map(o => o.toJSON()),
      scriptPath: this.scriptPath
    };
    await this.globalDoc.set(toSave);
  }

  private updateFields(snapshot: firebase.firestore.DocumentSnapshot) {
    if (!snapshot.exists) {
      return;
    }
    const json = snapshot.data() as IBidConfigurationJSON;
    this.interval = json.interval;
    this.scriptPath = json.scriptPath;
    this.objectsToSell = new List(
      json.objectsToSell.map(o => ObjectToSellEntry.fromJSON(o))
    );
    this.onChanged.trigger();
  }
}
