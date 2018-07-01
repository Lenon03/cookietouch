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
  private readonly onChanged = new LiteEvent<void>();

  constructor(account: Account) {
    this.account = account;
    this.interval = 10;
    this.scriptPath = "";
    this.objectsToSell = new List();
  }

  get isScriptPathValid(): boolean {
    return !isBlank(this.scriptPath);
  }

  public get Changed() {
    return this.onChanged.expose();
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
        }/characters/${this.account.game.character.name}/bid`
      );

    const data = await globalDoc.get();
    if (!data.exists) {
      return;
    }
    const json = data.data() as IBidConfigurationJSON;

    this.interval = json.interval;
    this.scriptPath = json.scriptPath;
    this.objectsToSell = new List(
      json.objectsToSell.map(o => ObjectToSellEntry.fromJSON(o))
    );
    this.onChanged.trigger();
  }

  public async save() {
    const toSave: IBidConfigurationJSON = {
      interval: this.interval,
      objectsToSell: this.objectsToSell.ToArray().map(o => o.toJSON()),
      scriptPath: this.scriptPath
    };
    const user = firebase.auth().currentUser;
    const globalDoc = firebase
      .firestore()
      .doc(
        `users/${user.uid}/config/accounts/${
          this.account.accountConfig.username
        }/characters/${this.account.game.character.name}/bid`
      );

    await globalDoc.set(toSave);
    this.onChanged.trigger();
  }
}
