import Logger from "@logger";
import DTConstants from "@protocol/DTConstants";
import Dispatcher from "@utils/Dispatcher";
import LiteEvent from "@utils/LiteEvent";
import Frames from "../frames";
import FramesData from "../frames/FramesData";
import Game from "../game";
import Network from "../network";
import HaapiConnection from "../network/HaapiConnection";
import AccountConfiguration from "./AccountConfiguration";
import AccountData from "./AccountData";
import { AccountStates } from "./AccountStates";

export default class Account {

  public data: AccountData;
  public game: Game;
  public network: Network;
  public haapi: HaapiConnection;
  public dispatcher: Dispatcher;
  public framesData: FramesData;
  public logger: Logger;
  public config: AccountConfiguration;

  public get StateChanged() { return this.onStateChanged.expose(); }
  public get Disconnected() { return this.onDisconnected.expose(); }
  public get RecaptchaReceived() { return this.onRecaptchaReceived.expose(); }
  public get RecaptchaResolved() { return this.onRecaptchaResolved.expose(); }
  private readonly onStateChanged = new LiteEvent<void>();
  private readonly onDisconnected = new LiteEvent<void>();
  private readonly onRecaptchaReceived = new LiteEvent<Account>();
  private readonly onRecaptchaResolved = new LiteEvent<{account: Account, success: boolean}>();

  private frames: Frames;
  private _state: AccountStates;

  constructor(username: string, password: string, lang: string = "fr") {
    this.logger = new Logger();
    this.data = new AccountData(username, password, lang);
    this.config = new AccountConfiguration();
    this.framesData = new FramesData();
    this.state = AccountStates.DISCONNECTED;
    this.dispatcher = new Dispatcher();
    this.haapi = new HaapiConnection();
    this.network = new Network(this);
    this.game = new Game(this);
    this.frames = new Frames(this);
    this.network.Disconnected.on(() => {
      this.state = AccountStates.DISCONNECTED;
      this.onDisconnected.trigger();
    });
  }

  get state() {
    return this._state;
  }

  set state(state: AccountStates) {
    this._state = state;
    this.onStateChanged.trigger();
  }

  public start() {
    this.framesData.clear();
    this.network.clear();
    this.game.clear();
    this.haapi.processHaapi(this.data.username, this.data.password)
      .then(() => {
        console.log("Haapi", this.haapi);
        this.state = AccountStates.CONNECTING;
        this.network.connect(DTConstants.config.sessionId, DTConstants.config.dataUrl);
      });
  }

  public stop() {
    this.network.close();
  }

  get isBusy(): boolean {
    return this.state !== AccountStates.NONE && this.state !== AccountStates.REGENERATING;
  }

  get isFighting() {
    return this.state === AccountStates.FIGHTING;
  }

  get isGathering() {
    return this.state === AccountStates.GATHERING;
  }

  get isInDialog() {
    return this.state === AccountStates.STORAGE || AccountStates.TALKING
      || AccountStates.EXCHANGE || AccountStates.BUYING || AccountStates.SELLING;
  }

  public leaveDialog() {
    if (this.isInDialog) {
      this.network.sendMessage("LeaveDialogRequestMessage");
    }
  }
}
