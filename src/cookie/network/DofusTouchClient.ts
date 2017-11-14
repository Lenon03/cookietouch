import axios from "axios";
import Account from "../game/Account";
import Dispatcher from "../utils/Dispatcher";
const Primus = require("./primus"); // tslint:disable-line

export default class DofusTouchClient {

  public static getAssetsVersions(): Promise<any> {
    return new Promise((resolve, reject) => {
      axios.get("https://proxyconnection.touch.dofus.com/assetsVersions.json")
        .then((response) => {
          resolve(response.data);
        });
    });
  }
  public static getAppVersion(): Promise<string> {
    return new Promise((resolve, reject) => {
      axios.get("https://itunes.apple.com/lookup?id=1041406978").then((response) => {
        resolve(response.data.results[0].version);
      });
    });
  }

  public static getBuildVersion(): Promise<string> {
    return new Promise((resolve, reject) => {
      axios.get("https://proxyconnection.touch.dofus.com/build/script.js").then((response) => {
        const regex = /.*buildVersion=("|')([0-9]*\.[0-9]*\.[0-9]*)("|')/g;
        const m = regex.exec(response.data.substring(1, 10000));
        resolve(m[2]);
      });
    });
  }

  public server: any;
  public appVersion: string;
  public buildVersion: string;
  public assetsVersion: string;
  public staticDataVersion: string;

  private account: Account;
  private socket: any;
  private sessionId: string;
  private migrating: boolean = false;

  constructor(account: Account) {
    this.account = account;
    DofusTouchClient.getAppVersion().then((version) => (this.appVersion = version));
    DofusTouchClient.getBuildVersion().then((version) => (this.buildVersion = version));
    DofusTouchClient.getAssetsVersions().then((data) => {
      this.assetsVersion = data.assetsVersion;
      this.staticDataVersion = data.staticDataVersion;
    });
  }

  public connect(sessionId: string, url: string) {
    this.sessionId = sessionId;
    const currentUrl = this.makeSticky(url, this.sessionId);
    console.log("Connecting to login server (" + currentUrl + ") ...");

    this.socket = new Primus(currentUrl, {
      manual: true,
      reconnect: {
        max: Infinity,
        min: 500,
        retries: 10,
      },
      strategy: "disconnect,timeout",
      transformer: "engine.io",
    });

    this.setCurrentConnection();
    this.socket.open();
  }

  public close() {
    this.socket.destroy();
  }

  public migrate(url: string) {
    this.migrating = true;
    this.send("disconnecting", "SWITCHING_TO_GAME");
    this.socket.destroy();

    // EventHub.$emit("logs", {
    //   action: "WARNING",
    //   data: "Switching to game.",
    // });

    const currentUrl = this.makeSticky(url, this.sessionId);
    console.log("Connecting to game server (" + currentUrl + ") ...");
    this.socket = new Primus(currentUrl, {
      manual: true,
      reconnect: {
        max: Infinity,
        min: 500,
        retries: 10,
      },
      strategy: "disconnect,timeout",
      transformer: "engine.io",
    });

    this.setCurrentConnection();
    this.socket.open();
  }

  public send(call: string, data?: any) {
    // Si data est null et que call est different de sendMessage,
    // c'est un simple call sans data. Sinon c'est un sendMessage sans data.
    // Si data est pas null et que call est different de sendMessage
    // C'est
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

    console.log("Sent: ", msg);
    // EventHub.$emit("logs", {
    //   action: "SND",
    //   data: test,
    // });
    this.account.dispatcher.emit(msgName, this.account, data);
    this.socket.write(msg);
  }

  public sendMessage(messageName: string, data?: any) {
    this.send("sendMessage", { type: messageName, data });
  }

  public setCurrentConnection() {
    this.socket.on("open", () => {
      console.log("Connection opened");

      console.log("MIGRATING: ", this.migrating);

      if (this.migrating === false) {
        this.send("connecting", {
          appVersion: this.appVersion,
          buildVersion: this.buildVersion,
          client: "android",
          language: this.account.lang,
          server: "login",
        });
      } else {
        this.migrating = false;
        this.send("connecting", {
          appVersion: this.appVersion,
          buildVersion: this.buildVersion,
          client: "android",
          language: this.account.lang,
          server: this.server,
        });
      }
    });

    this.socket.on("data", (data: any) => {
      console.log("Received: ", data);
      // EventHub.$emit("logs", {
      //   action: "RCV",
      //   data: data._messageType,
      // });
      this.account.dispatcher.emit(data._messageType, this.account, data);
    });

    this.socket.on("error", (err: any) => {
      console.error("Something horrible has happened", err.stack);
    });

    this.socket.on("reconnect", (opts: any) => {
      console.log("Reconnection attempt started");
    });

    this.socket.on("reconnect scheduled", (opts: any) => {
      console.log("Reconnecting in %d ms", opts.scheduled);
      console.log("This is attempt %d out of %d", opts.attempt, opts.retries);
    });

    this.socket.on("reconnected", (opts: any) => {
      console.log("It took %d ms to reconnect", opts.duration);
    });

    this.socket.on("reconnect timeout", (err: any, opts: any) => {
      console.log("Timeout expired: %s", err.message);
    });

    this.socket.on("reconnect failed", (err: any, opts: any) => {
      console.log("The reconnection failed: %s", err.message);
    });

    this.socket.on("timeout", () => {
      console.log("Connection timeout");
    });

    this.socket.on("online", () => {
      console.log("Connection goes online");
    });

    this.socket.on("readyStateChange", (state: any) => {
      console.log("Connection readyStateChange: ", state);
    });

    this.socket.on("offline", () => {
      console.log("Connection goes offline");
    });

    this.socket.on("end", () => {
      console.log("Connection ended");
    });

    this.socket.on("close", () => {
      console.log("Connection closed");

      // EventHub.$emit("logs", {
      //   action: "WARNING",
      //   data: "Déconnecté.",
      // });
    });

    this.socket.on("destroy", () => {
      console.log("Connection destroyed");
    });
  }

  private makeSticky(url: string, sessionId: string): string {
    const seperator = url.indexOf("?") === -1 ? "?" : "&";
    return url + seperator + "STICKER" + "=" + encodeURIComponent(sessionId);
  }
}
