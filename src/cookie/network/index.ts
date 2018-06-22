import Account from "@/account";
import { AccountStates } from "@/account/AccountStates";
import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import LanguageManager from "@/configurations/language/LanguageManager";
import { NetworkPhases } from "@/network/NetworkPhases";
import DTConstants from "@/protocol/DTConstants";
import Message from "@/protocol/network/messages/Message";
import IClearable from "@/utils/IClearable";
import LiteEvent from "@/utils/LiteEvent";

const Primus = require("./primus"); // tslint:disable-line

export default class Network implements IClearable {
  public connected: boolean = false;
  private account: Account;
  private socket: any;
  private sessionId: string;
  private server: any;
  private access: string;
  private _phase: NetworkPhases;
  private readonly onPhaseChanged = new LiteEvent<NetworkPhases>();
  private readonly onDisconnected = new LiteEvent<void>();
  private readonly onMessageSent = new LiteEvent<{ type: string; data: any }>();
  private readonly onMessageReceived = new LiteEvent<{
    type: string;
    data: any;
  }>();

  constructor(account: Account) {
    this.account = account;
    this._phase = NetworkPhases.NONE;
  }

  get phase() {
    return this._phase;
  }

  set phase(phase: NetworkPhases) {
    this._phase = phase;
    this.onPhaseChanged.trigger(phase);
  }

  public get PhaseChanged() {
    return this.onPhaseChanged.expose();
  }

  public get Disconnected() {
    return this.onDisconnected.expose();
  }

  public get MessageSent() {
    return this.onMessageSent.expose();
  }

  public get MessageReceived() {
    return this.onMessageReceived.expose();
  }

  public clear() {
    this.sessionId = null;
    this.server = null;
    this.access = null;
  }

  public connect(sessionId: string, url: string) {
    if (this.connected || this.phase !== NetworkPhases.NONE) {
      return;
    }
    this.sessionId = sessionId;
    const currentUrl = this.makeSticky(url, this.sessionId);
    this.account.logger.logDebug(
      LanguageManager.trans("primus"),
      LanguageManager.trans("connectToLogin", currentUrl)
    );
    this.socket = this.createSocket(currentUrl);
    this.setCurrentConnection();
    this.socket.open();
  }

  public close() {
    if (!this.connected) {
      return;
    }

    if (this.socket) {
      this.socket.destroy();
    }
  }

  public switchToGameServer(url: string, server: any) {
    this.server = server;
    if (!this.connected || this.phase !== NetworkPhases.LOGIN) {
      return;
    }
    this.phase = NetworkPhases.SWITCHING_TO_GAME;
    this.send("disconnecting", "SWITCHING_TO_GAME");
    this.socket.destroy();
    const currentUrl = this.makeSticky(url, this.sessionId);
    this.account.logger.logDebug(
      LanguageManager.trans("primus"),
      LanguageManager.trans("connectToGame", currentUrl)
    );
    this.socket = this.createSocket(currentUrl);
    this.setCurrentConnection();
    this.socket.open();
  }

  public async send(call: string, data?: any) {
    if (!this.connected) {
      return;
    }

    let msg;
    let msgName;

    if (call === "sendMessage") {
      msgName = data.type;
      msg = data.data ? { call, data } : { call, data: { type: data.type } };
    } else {
      msgName = call;
      msg = data ? { call, data } : { call };
    }

    console.log("Sent", msg);
    this.onMessageSent.trigger({ type: msgName, data });
    this.account.dispatcher.emit(msgName, this.account, data);
    this.socket.write(msg);
  }

  public async sendMessageFree(messageName: string, data?: any) {
    await this.send("sendMessage", { type: messageName, data });
  }

  // Remove for now because class are rename in production mode...
  // public async sendMessage(message: Message) {
  //   const str = JSON.stringify(message);
  //   const data = JSON.parse(str);
  //   await this.sendMessageFree(message.constructor.name, data);
  // }

  private setCurrentConnection() {
    this.socket.on("open", () => {
      this.connected = true;
      this.account.logger.logDebug(
        LanguageManager.trans("primus"),
        LanguageManager.trans("connectionOpened")
      );

      if (this.phase === NetworkPhases.NONE) {
        this.send("connecting", {
          appVersion: DTConstants.appVersion,
          buildVersion: DTConstants.buildVersion,
          client: "android",
          language: GlobalConfiguration.lang,
          server: "login"
        });
      } else {
        this.send("connecting", {
          appVersion: DTConstants.appVersion,
          buildVersion: DTConstants.buildVersion,
          client: "android",
          language: GlobalConfiguration.lang,
          server: this.server
        });
      }
    });

    this.socket.on("data", (data: any) => {
      console.log("Received", data);
      this.onMessageReceived.trigger({ type: data._messageType, data });
      this.account.dispatcher.emit(data._messageType, this.account, data);
    });

    this.socket.on("error", (err: Error) => {
      this.account.logger.logError(
        LanguageManager.trans("primus"),
        LanguageManager.trans("primusError", err.message)
      );
    });

    this.socket.on("reconnect", (opts: any) => {
      this.account.logger.logDebug(
        LanguageManager.trans("primus"),
        LanguageManager.trans("primusReconnect")
      );
    });

    this.socket.on("reconnect scheduled", (opts: any) => {
      this.account.logger.logDebug(
        LanguageManager.trans("primus"),
        LanguageManager.trans("primusReconnecting", opts.scheduled)
      );
      this.account.logger.logDebug(
        LanguageManager.trans("primus"),
        LanguageManager.trans(
          "primusReconnectAttempt",
          opts.attempt,
          opts.retries
        )
      );
    });

    this.socket.on("reconnected", (opts: any) => {
      this.account.logger.logDebug(
        LanguageManager.trans("primus"),
        LanguageManager.trans("primusReconnected", opts.duration)
      );
    });

    this.socket.on("reconnect timeout", (err: Error, opts: any) => {
      this.account.logger.logDebug(
        LanguageManager.trans("primus"),
        LanguageManager.trans("primusTimeoutExpired", err.message)
      );
    });

    this.socket.on("reconnect failed", (err: Error, opts: any) => {
      this.account.logger.logDebug(
        LanguageManager.trans("primus"),
        LanguageManager.trans("primusReconnectFailed", err.message)
      );
    });

    this.socket.on("timeout", () => {
      this.account.logger.logDebug(
        LanguageManager.trans("primus"),
        LanguageManager.trans("primusTimeout")
      );
    });

    this.socket.on("online", () => {
      this.account.logger.logDebug(
        LanguageManager.trans("primus"),
        LanguageManager.trans("primusOnline")
      );
    });

    this.socket.on("readyStateChange", (state: any) => {
      this.account.logger.logDebug(
        LanguageManager.trans("primus"),
        LanguageManager.trans("primusState", state)
      );
    });

    this.socket.on("offline", () => {
      this.account.logger.logDebug(
        LanguageManager.trans("primus"),
        LanguageManager.trans("primusOffline")
      );
    });

    this.socket.on("end", () => {
      this.account.logger.logDebug(
        LanguageManager.trans("primus"),
        LanguageManager.trans("primusEnded")
      );
    });

    this.socket.on("close", () => {
      this.account.logger.logDebug(
        LanguageManager.trans("primus"),
        LanguageManager.trans("primusClosed")
      );

      this.connected = false;
      this.onDisconnected.trigger();

      if (this.phase === NetworkPhases.SWITCHING_TO_GAME /*&& this.account*/) {
        this.account.state = AccountStates.CONNECTING;
      } else {
        this.phase = NetworkPhases.NONE;
      }
    });

    this.socket.on("destroy", () => {
      this.account.logger.logDebug(
        LanguageManager.trans("primus"),
        LanguageManager.trans("primusDestroyed")
      );
    });
  }

  private makeSticky(url: string, sessionId: string): string {
    const seperator = url.indexOf("?") === -1 ? "?" : "&";
    return url + seperator + "STICKER" + "=" + encodeURIComponent(sessionId);
  }

  private createSocket(url: string) {
    return new Primus(url, {
      manual: true,
      reconnect: {
        max: 5000,
        min: 500,
        retries: 10
      },
      strategy: "disconnect,timeout",
      transformer: "engine.io"
    });
  }
}
