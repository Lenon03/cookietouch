import Group from "@/groups/Group";
import ScriptsManager from "@/scripts/ScriptsManager";
import TimerWrapper from "@/utils/TimerWrapper";
import Logger from "@logger";
import DTConstants from "@protocol/DTConstants";
import Dispatcher from "@utils/Dispatcher";
import LiteEvent from "@utils/LiteEvent";
import { sleep } from "@utils/Time";
import * as moment from "moment";
import RecaptchaHandler from "../core/RecaptchaHandler";
import Extensions from "../extensions";
import Frames from "../frames";
import FramesData from "../frames/FramesData";
import Game from "../game";
import Network from "../network";
import HaapiConnection from "../network/HaapiConnection";
import { NetworkPhases } from "../network/NetworkPhases";
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
  public extensions: Extensions;
  public scripts: ScriptsManager;
  public group: Group = null;
  public planificationTimer: TimerWrapper;

  get hasGroup(): boolean {
    return this.group !== null;
  }

  get isGroupChief(): boolean {
    return !this.hasGroup || this.group.chief === this;
  }

  public get StateChanged() { return this.onStateChanged.expose(); }
  // public get Disconnected() { return this.onDisconnected.expose(); }
  public get RecaptchaReceived() { return this.onRecaptchaReceived.expose(); }
  public get RecaptchaResolved() { return this.onRecaptchaResolved.expose(); }
  private readonly onStateChanged = new LiteEvent<void>();
  // private readonly onDisconnected = new LiteEvent<void>();
  private readonly onRecaptchaReceived = new LiteEvent<Account>();
  private readonly onRecaptchaResolved = new LiteEvent<{ account: Account, success: boolean }>();

  private frames: Frames;
  private _state: AccountStates;
  private _wasScriptRunning = false;
  private _wasScriptEnabled = false;

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
    this.scripts = new ScriptsManager(this);
    this.frames = new Frames(this);
    this.extensions = new Extensions(this);
    this.planificationTimer = new TimerWrapper(this.plannificationCallback, this, 30000, 30000);

    this.network.Disconnected.on(this.onNetworkDisconnected.bind(this));
    this.game.map.MapLoaded.on(this.onMapLoaded.bind(this));
  }

  get state() {
    return this._state;
  }

  set state(state: AccountStates) {
    this._state = state;
    this.onStateChanged.trigger();
  }

  public start() {
    if (this.state !== AccountStates.DISCONNECTED) {
      return;
    }
    if (!this.planificationTimer.enabled) {
      this.planificationTimer.start();
    }
    this.framesData.clear();
    this.network.clear();
    this.game.clear();
    this.extensions.clear();
    this.state = AccountStates.CONNECTING;
    this.haapi.processHaapi(this.data.username, this.data.password)
      .then(() => {
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
    return this.state === AccountStates.STORAGE || this.state === AccountStates.TALKING
      || this.state === AccountStates.EXCHANGE || this.state === AccountStates.BUYING
      || this.state === AccountStates.SELLING;
  }

  public leaveDialog() {
    if (this.isInDialog) {
      this.network.sendMessageFree("LeaveDialogRequestMessage");
    }
  }

  public async handleRecaptcha(sitekey: string, tries: number = 1) {
    this.state = AccountStates.RECAPTCHA;
    // If _wasScriptRunning was already true, don't change it
    this._wasScriptRunning = this._wasScriptRunning || this.scripts.enabled;
    this.scripts.stopScript();
    this.onRecaptchaReceived.trigger(this);
    try {
      const NS_PER_SEC = 1e9;
      const time = process.hrtime();

      let response: string;
      try {
        response = await RecaptchaHandler.getResponse(sitekey);
      } catch (error) {
        this.logger.logError("reCaptcha", "No idle workers are available at the moment, please try a bit later");
        await this.handleRecaptcha(sitekey); // TODO: Really ?
        return;
      }

      // If the response is null, it's because the user didn't enter an anti-captcha key
      if (response === null) {
        // We shouldn't leave this true
        this._wasScriptRunning = false;
        this.logger.logError("reCaptcha", "You have to enter a Anticaptcha key in order to bypass recaptcha.");
        this.onRecaptchaResolved.trigger({ account: this, success: false });
      } else {
        const diff = process.hrtime(time);
        this.logger.logInfo("reCaptcha", `Recaptcha solved in ${diff[0] * NS_PER_SEC + diff[1]} nanoseconds.`);

        await this.network.send("recaptchaResponse", response);

        if (this.state === AccountStates.RECAPTCHA) {
          this.state = AccountStates.NONE;
        }

        // Resume script if this is a solo account
        // Sometimes this will fail if we receive more than one captcha
        if (!this.hasGroup && this._wasScriptRunning) {
          await sleep(2000);
          this.scripts.startScript();
          // Only set reset _wasScriptRunning if the script was actually started
          // Because if the bot received another recaptcha, startScript will just return because isBusy will be true
          if (this.scripts.enabled) {
            this._wasScriptRunning = false;
          }
        } else if (this.hasGroup) {
          // Otherwise if this is a group member, trigger onRecaptchaResolved
          this.onRecaptchaResolved.trigger({ account: this, success: true });
        }
      }
    } catch (error) {
      this.logger.logError("reCaptcha", error);
      if (tries < 3) {
        this.logger.logError("reCaptcha", `Attempt #${++tries} in 10 seconds.`);
        await this.handleRecaptcha(sitekey, tries);
      }
    }
  }

  private async plannificationCallback() {
    if (!this.config.planificationActivated) {
      return;
    }
    const hour = moment().hour();
    // If the bot is connected and the hour is red
    if (this.network.connected && this.config.planification[hour] === false && this.state !== AccountStates.FIGHTING) {
      this.logger.logInfo("Planification", "Automatic disconnection.");
      await this.stop();
    } else if (this.state === AccountStates.DISCONNECTED && this.config.planification[hour]) {
      // If the bot is disconnected and the hour is green
      this.logger.logInfo("Planification", "Automatic reconnection.");
      await this.start();
    }
  }

  private onNetworkDisconnected() {
    this.state = AccountStates.DISCONNECTED;
    if (this.network.phase !== NetworkPhases.SWITCHING_TO_GAME) {
      this._wasScriptEnabled = this.scripts.enabled;
      this.scripts.stopScript();
      this.extensions.flood.stop();
    }
    // this.onDisconnected.trigger();
  }

  private async onMapLoaded() {
    if (!this.config.planificationActivated || !this._wasScriptEnabled) {
      return;
    }
    await sleep(1500);
    this.logger.logInfo("Planification", "Restarting the script.");
    this.scripts.startScript();
  }
}
