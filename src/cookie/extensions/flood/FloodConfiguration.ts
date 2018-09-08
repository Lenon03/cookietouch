import Account from "@/account";
import FloodSentence, {
  IFloodSentence
} from "@/extensions/flood/FloodSentence";
import LiteEvent from "@/utils/LiteEvent";
import firebase from "firebase/app";

interface IFloodConfigurationJSON {
  seekChannelInterval: number;
  salesChannelInterval: number;
  generalChannelInterval: number;
  sentences: IFloodSentence[];
}

export default class FloodConfiguration implements IFloodConfigurationJSON {
  public seekChannelInterval: number;
  public salesChannelInterval: number;
  public generalChannelInterval: number;
  public sentences: FloodSentence[];

  private authChangedUnsuscribe: firebase.Unsubscribe;
  private stopDataSnapshot: () => void;

  private globalDoc: firebase.firestore.DocumentReference;

  private account: Account;
  private readonly onChanged = new LiteEvent<void>();

  constructor(account: Account) {
    this.account = account;
    this.seekChannelInterval = 60;
    this.salesChannelInterval = 120;
    this.generalChannelInterval = 30;
    this.sentences = [];
  }

  public get Changed() {
    return this.onChanged.expose();
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
            }/characters/${this.account.game.character.name}/flood`
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
    const toSave: IFloodConfigurationJSON = {
      generalChannelInterval: this.generalChannelInterval,
      salesChannelInterval: this.salesChannelInterval,
      seekChannelInterval: this.seekChannelInterval,
      sentences: this.sentences.map(o => o.toJSON())
    };
    await this.globalDoc.set(toSave);
  }

  private updateFields(snapshot: firebase.firestore.DocumentSnapshot) {
    if (!snapshot.exists) {
      return;
    }
    const json = snapshot.data() as IFloodConfigurationJSON;
    this.seekChannelInterval = json.seekChannelInterval;
    this.salesChannelInterval = json.salesChannelInterval;
    this.generalChannelInterval = json.generalChannelInterval;
    this.sentences = json.sentences.map(o => FloodSentence.fromJSON(o));
    this.onChanged.trigger();
  }
}
