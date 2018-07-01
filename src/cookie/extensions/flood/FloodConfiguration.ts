import Account from "@/account";
import FloodSentence, {
  IFloodSentence
} from "@/extensions/flood/FloodSentence";
import LiteEvent from "@/utils/LiteEvent";
import firebase from "firebase";
import { List } from "linqts";

interface IFloodConfigurationJSON {
  seekChannelInterval: number;
  salesChannelInterval: number;
  generalChannelInterval: number;
  sentences: IFloodSentence[];
}

export default class FloodConfiguration {
  public seekChannelInterval: number;
  public salesChannelInterval: number;
  public generalChannelInterval: number;
  public sentences: List<FloodSentence>;

  private account: Account;
  private readonly onChanged = new LiteEvent<void>();

  constructor(account: Account) {
    this.account = account;
    this.seekChannelInterval = 60;
    this.salesChannelInterval = 120;
    this.generalChannelInterval = 30;
    this.sentences = new List();
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
        }/characters/${this.account.game.character.name}/flood`
      );

    const data = await globalDoc.get();
    if (!data.exists) {
      return;
    }
    const json = data.data() as IFloodConfigurationJSON;
    this.seekChannelInterval = json.seekChannelInterval;
    this.salesChannelInterval = json.salesChannelInterval;
    this.generalChannelInterval = json.generalChannelInterval;
    this.sentences = new List(
      json.sentences.map(o => FloodSentence.fromJSON(o))
    );
    this.onChanged.trigger();
  }

  public async save() {
    const toSave: IFloodConfigurationJSON = {
      generalChannelInterval: this.generalChannelInterval,
      salesChannelInterval: this.salesChannelInterval,
      seekChannelInterval: this.seekChannelInterval,
      sentences: this.sentences.ToArray().map(o => o.toJSON())
    };

    const user = firebase.auth().currentUser;
    const globalDoc = firebase
      .firestore()
      .doc(
        `users/${user.uid}/config/accounts/${
          this.account.accountConfig.username
        }/characters/${this.account.game.character.name}/flood`
      );

    await globalDoc.set(toSave);
    this.onChanged.trigger();
  }
}
