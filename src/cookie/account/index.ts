import AccountData from "@/account/AccountData";
import { AccountStates } from "@/account/AccountStates";
import Configuration from "@/account/configurations/Configuration";
import AccountConfiguration from "@/configurations/accounts/AccountConfiguration";
import LanguageManager from "@/configurations/language/LanguageManager";
import Logger from "@/core/logger";
import RecaptchaHandler from "@/core/RecaptchaHandler";
import Extensions from "@/extensions";
import FramesData from "@/frames/FramesData";
import Game from "@/game";
import Group from "@/groups/Group";
import Network from "@/network";
import HaapiConnection from "@/network/HaapiConnection";
import { NetworkPhases } from "@/network/NetworkPhases";
import DTConstants from "@/protocol/DTConstants";
import ScriptsManager from "@/scripts/ScriptsManager";
import StatisticsManager from "@/statistics/StatisticsManager";
import IEntity from "@/utils/IEntity";
import LiteEvent from "@/utils/LiteEvent";
import Pushbullet from "@/utils/Pushbullet";
import { NotificationType } from "@/utils/Pushbullet/types";
import { randomString } from "@/utils/Random";
import { displayTime, sleep } from "@/utils/Time";
import TimerWrapper from "@/utils/TimerWrapper";
import moment from "moment";

export enum BonusPackMoney {
  KAMAS = "KMS",
  GOULTINES = "GOU"
}

export enum BonusPackDuration {
  WEEK = 7,
  MONTH = 30
}

export default class Account implements IEntity {
  public accountConfig: AccountConfiguration;
  public game: Game;
  public data: AccountData;
  public network: Network;
  public haapi: HaapiConnection;
  public framesData: FramesData;
  public logger: Logger;
  public config: Configuration;
  public extensions: Extensions;
  public scripts: ScriptsManager;
  public group: Group = null;
  public planificationTimer: TimerWrapper;
  public statistics: StatisticsManager;
  private readonly onStateChanged = new LiteEvent<void>();
  // private readonly onDisconnected = new LiteEvent<void>();
  private readonly onRecaptchaReceived = new LiteEvent<Account>();
  private readonly onRecaptchaResolved = new LiteEvent<{
    account: Account;
    success: boolean;
  }>();
  private _wasScriptRunning = false;
  private _wasScriptEnabled = false;
  private _state: AccountStates;

  constructor(config: AccountConfiguration) {
    this.logger = new Logger();
    this.data = new AccountData();
    this.accountConfig = config;
    this.config = new Configuration(this);
    this.framesData = new FramesData();
    this.state = AccountStates.DISCONNECTED;
    this.haapi = new HaapiConnection(this);
    this.network = new Network(this);
    this.game = new Game(this);
    this.scripts = new ScriptsManager(this);
    this.extensions = new Extensions(this);
    this.statistics = new StatisticsManager(this);
    this.planificationTimer = new TimerWrapper(
      this.plannificationCallback,
      this,
      30000
    );

    this.network.Disconnected.on(this.onNetworkDisconnected);
    this.game.map.MapLoaded.on(this.onMapLoaded);
  }

  get hasGroup(): boolean {
    return this.group !== null;
  }

  get isGroupChief(): boolean {
    return !this.hasGroup || this.group.chief === this;
  }

  public get StateChanged() {
    return this.onStateChanged.expose();
  }

  // public get Disconnected() { return this.onDisconnected.expose(); }
  public get RecaptchaReceived() {
    return this.onRecaptchaReceived.expose();
  }

  public get RecaptchaResolved() {
    return this.onRecaptchaResolved.expose();
  }

  get state() {
    return this._state;
  }

  set state(state: AccountStates) {
    this._state = state;
    this.onStateChanged.trigger();
  }

  get isBusy(): boolean {
    return (
      this.state !== AccountStates.NONE &&
      this.state !== AccountStates.REGENERATING
    );
  }

  get isFighting() {
    return this.state === AccountStates.FIGHTING;
  }

  get isGathering() {
    return this.state === AccountStates.GATHERING;
  }

  get isInDialog() {
    return (
      this.state === AccountStates.STORAGE ||
      this.state === AccountStates.TALKING ||
      this.state === AccountStates.EXCHANGE ||
      this.state === AccountStates.BUYING ||
      this.state === AccountStates.SELLING
    );
  }

  public async start() {
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
    try {
      await this.haapi.processHaapi(
        this.accountConfig.username,
        this.accountConfig.password
      );
      this.network.connect(
        randomString(16),
        DTConstants.config.dataUrl
      );
      // this.network.connect(DTConstants.config.sessionId, DTConstants.config.dataUrl);
    } catch (error) {
      this.logger.logError("", error.message);
    }
  }

  public stop() {
    this.config.removeListeners();
    this.extensions.bid.config.removeListeners();
    this.extensions.fights.config.removeListeners();
    this.extensions.flood.config.removeListeners();
    this.network.close();
  }

  public leaveDialog() {
    if (this.isInDialog) {
      this.network.sendMessageFree("LeaveDialogRequestMessage");
    }
  }

  public buyBonusPack(
    money = BonusPackMoney.KAMAS,
    duration = BonusPackDuration.WEEK
  ) {
    const handleSetShopDetailsSuccess = (account: Account, message: any) => {
      this.network.send("shopOpenRequest");
      this.network.unregisterMessage(setShopDetailsSuccessHandlerID);
    };

    const setShopDetailsSuccessHandlerID = this.network.registerMessage(
      "setShopDetailsSuccess",
      handleSetShopDetailsSuccess
    );

    const handleShopOpenSuccess = (account: Account, message: any) => {
      this.network.send("shopOpenCategoryRequest", {
        categoryId: 557,
        page: 1,
        size: 3
      });
      this.network.unregisterMessage(handleShopOpenSuccessHandlerID);
    };

    const handleShopOpenSuccessHandlerID = this.network.registerMessage(
      "shopOpenSuccess",
      handleShopOpenSuccess
    );

    const handleShopOpenCategorySuccess = (account: Account, message: any) => {
      const choice = message.articles.find(a =>
        (a.name as string).includes(duration.toString())
      );
      this.network.send("shopBuyRequest", {
        amountHard: choice.price,
        amountSoft: Math.round(
          choice.price * this.data.bakHardToSoftCurrentRate
        ),
        currency: money,
        isMysteryBox: false,
        purchase: [
          {
            id: choice.id,
            quantity: 1
          }
        ]
      });
      this.network.unregisterMessage(shopOpenCategorySuccessHandlerID);
    };

    const shopOpenCategorySuccessHandlerID = this.network.registerMessage(
      "shopOpenCategorySuccess",
      handleShopOpenCategorySuccess
    );

    const handleShopBuySuccess = (account: Account, message: any) => {
      console.log("GOOD BUY!!!!");
      this.network.unregisterMessage(shopBuySuccessHandlerID);
    };

    const shopBuySuccessHandlerID = this.network.registerMessage(
      "shopBuySuccess",
      handleShopBuySuccess
    );

    this.network.send("setShopDetailsRequest", {});
    this.network.send("restoreMysteryBox");
  }

  public async handleRecaptcha(sitekey: string, tries: number = 1) {
    this.state = AccountStates.RECAPTCHA;
    // If _wasScriptRunning was already true, don't change it
    this._wasScriptRunning = this._wasScriptRunning || this.scripts.enabled;
    this.scripts.stopScript();
    this.onRecaptchaReceived.trigger(this);
    Pushbullet.sendNotification(NotificationType.CAPTCHA_REQUEST, this);
    try {
      const NS_PER_SEC = 1e9;
      const time = process.hrtime();
      this.logger.logDebug("reCaptcha", "Getting response...");
      const response = await RecaptchaHandler.getResponse(sitekey);
      this.logger.logDebug("reCaptcha", "Got response!");

      if (response === "no-balance" || response === "no-key") {
        // We shouldn't leave this true
        this._wasScriptRunning = false;
        this.logger.logError(
          "reCaptcha",
          LanguageManager.trans(`anticaptcha-${response}`)
        );
        this.onRecaptchaResolved.trigger({ account: this, success: false });
      } else {
        const diff = process.hrtime(time);
        this.logger.logInfo(
          "reCaptcha",
          LanguageManager.trans(
            "recaptcha-solved",
            displayTime((diff[0] * NS_PER_SEC + diff[1]) / 1000000)
          )
        );

        this.network.send("recaptchaResponse", response);

        if (this.state === AccountStates.RECAPTCHA) {
          this.state = AccountStates.NONE;
        }

        // Resume script if this is a solo account
        // Sometimes this will fail if we receive more than one captcha
        if (!this.hasGroup && this._wasScriptRunning) {
          await sleep(2000);
          await this.scripts.startScript();
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
      this.logger.logError("reCaptcha", error.message);
      if (tries < 3) {
        this.logger.logError(
          "reCaptcha",
          LanguageManager.trans("recaptcha-attempt", ++tries)
        );
        await this.handleRecaptcha(sitekey, tries);
      }
    }
  }

  private plannificationCallback = async () => {
    if (!this.accountConfig.planificationActivated) {
      return;
    }
    const hour = moment().hour();
    // If the bot is connected and the hour is red
    if (
      this.network.connected &&
      this.accountConfig.planification[hour] === false &&
      this.state !== AccountStates.FIGHTING
    ) {
      this.logger.logInfo(
        "planification",
        LanguageManager.trans("autoDisconnect")
      );
      this.stop();
    } else if (
      this.state === AccountStates.DISCONNECTED &&
      this.accountConfig.planification[hour]
    ) {
      // If the bot is disconnected and the hour is green
      this.logger.logInfo(
        "planification",
        LanguageManager.trans("autoConnect")
      );
      await this.start();
    }
  };

  private onNetworkDisconnected = () => {
    this.state = AccountStates.DISCONNECTED;
    if (this.network.phase !== NetworkPhases.SWITCHING_TO_GAME) {
      this._wasScriptEnabled = this.scripts.enabled;
      this.scripts.stopScript();
      this.extensions.flood.stop();
    }
    if (this.config.pushBullet) {
      Pushbullet.sendNotification(NotificationType.DISCONNECT, this);
    }
    // this.onDisconnected.trigger();
  };

  private onMapLoaded = async () => {
    if (!this.accountConfig.planificationActivated || !this._wasScriptEnabled) {
      return;
    }
    await sleep(1500);
    this.logger.logInfo(
      "planification",
      LanguageManager.trans("restartingScript")
    );
    await this.scripts.startScript();
  };
}
