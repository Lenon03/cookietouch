import Account from "@account";
import { AccountStates } from "@account/AccountStates";
import DTConstants from "@protocol/DTConstants";
import Dispatcher from "@utils/Dispatcher";
import IClearable from "@utils/IClearable";
import LiteEvent from "@utils/LiteEvent";
import axios from "axios";
import { NetworkPhases } from "./NetworkPhases";
const Primus = require("./primus"); // tslint:disable-line

export default class Network implements IClearable {
  public connected: boolean = false;
  private account: Account;
  private socket: any;
  private sessionId: string;
  private _phase: NetworkPhases;
  private server: any;
  private access: string;

  public get PhaseChanged() { return this.onPhaseChanged.expose(); }
  public get Disconnected() { return this.onDisconnected.expose(); }
  public get MessageSent() { return this.onMessageSent.expose(); }
  public get MessageReceived() { return this.onMessageReceived.expose(); }
  private readonly onPhaseChanged = new LiteEvent<NetworkPhases>();
  private readonly onDisconnected = new LiteEvent<void>();
  private readonly onMessageSent = new LiteEvent<{type: string, data: any}>();
  private readonly onMessageReceived = new LiteEvent<{type: string, data: any}>();

  get phase() {
    return this._phase;
  }

  set phase(phase: NetworkPhases) {
    this._phase = phase;
    this.onPhaseChanged.trigger(phase);
  }

  constructor(account: Account) {
    this.account = account;
    this._phase = NetworkPhases.NONE;
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
    this.account.logger.logDebug("Primus", "Connecting to login server (" + currentUrl + ") ...");
    this.socket = this.createSocket(currentUrl);
    this.setCurrentConnection();
    this.socket.open();
  }

  public close() {
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
    this.account.logger.logDebug("Primus", "Connecting to game server (" + currentUrl + ") ...");
    this.socket = this.createSocket(currentUrl);
    this.setCurrentConnection();
    this.socket.open();
  }

  public async send(call: string, data?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let msg;
      let msgName;

      if (call === "sendMessage") {
        msgName = data.type;
        if (data.data) {
          msg = { call, data };
        } else {
          msg = { call, data: { type: data.type } };
        }
      } else {
        msgName = call;
        if (data) {
          msg = { call, data };
        } else {
          msg = { call };
        }
      }

      console.log("Sent", msg);
      this.onMessageReceived.trigger({ type: msgName, data});
      this.account.dispatcher.emit(msgName, this.account, data);
      this.socket.write(msg);
      resolve();
    });
  }

  public async sendMessage(messageName: string, data?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.send("sendMessage", { type: messageName, data });
      resolve();
    });
  }

  private setCurrentConnection() {
    this.socket.on("open", () => {
      this.connected = true;
      this.account.logger.logDebug("Primus", "Connection opened");

      if (this.phase === NetworkPhases.NONE) {
        this.send("connecting", {
          appVersion: DTConstants.appVersion,
          buildVersion: DTConstants.buildVersion,
          client: "android",
          language: this.account.data.lang,
          server: "login",
        });
      } else {
        this.send("connecting", {
          appVersion: DTConstants.appVersion,
          buildVersion: DTConstants.buildVersion,
          client: "android",
          language: this.account.data.lang,
          server: this.server,
        });
      }
    });

    this.socket.on("data", (data: any) => {
      console.log("Received", data);
      this.onMessageReceived.trigger({ type: data._messageType, data});
      this.account.dispatcher.emit(data._messageType, this.account, data);
    });

    this.socket.on("error", (err: any) => {
      console.error("Something horrible has happened", err.stack);
    });

    this.socket.on("reconnect", (opts: any) => {
      this.account.logger.logDebug("Primus", "Reconnection attempt started");
    });

    this.socket.on("reconnect scheduled", (opts: any) => {
      this.account.logger.logDebug("Primus", `Reconnecting in ${opts.scheduled} ms`);
      this.account.logger.logDebug("Primus", `This is attempt ${opts.attempt} out of ${opts.retries}`);
    });

    this.socket.on("reconnected", (opts: any) => {
      this.account.logger.logDebug("Primus", `It took ${opts.duration} ms to reconnect`);
    });

    this.socket.on("reconnect timeout", (err: any, opts: any) => {
      this.account.logger.logDebug("Primus", `Timeout expired: ${err.message}`);
    });

    this.socket.on("reconnect failed", (err: any, opts: any) => {
      this.account.logger.logDebug("Primus", `The reconnection failed: ${err.message}`);
    });

    this.socket.on("timeout", () => {
      this.account.logger.logDebug("Primus", "Connection timeout");
    });

    this.socket.on("online", () => {
      this.account.logger.logDebug("Primus", "Connection goes online");
    });

    this.socket.on("readyStateChange", (state: any) => {
      this.account.logger.logDebug("Primus", `Connection readyStateChange: ${state}`);
    });

    this.socket.on("offline", () => {
      this.account.logger.logDebug("Primus", "Connection goes offline");
    });

    this.socket.on("end", () => {
      this.account.logger.logDebug("Primus", "Connection ended");
    });

    this.socket.on("close", () => {
      this.account.logger.logDebug("Primus", "Connection closed");

      this.connected = false;
      this.onDisconnected.trigger();

      if (this.phase === NetworkPhases.SWITCHING_TO_GAME /*&& this.account*/) {
        this.account.state = AccountStates.CONNECTING;
      } else {
        this.phase = NetworkPhases.NONE;
      }
    });

    this.socket.on("destroy", () => {
      this.account.logger.logDebug("Primus", "Connection destroyed");
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
        max: Infinity,
        min: 500,
        retries: 10,
      },
      strategy: "disconnect,timeout",
      transformer: "engine.io",
    });
  }
}
