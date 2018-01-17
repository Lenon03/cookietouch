import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import LiteEvent from "@/utils/LiteEvent";
import { isBlank } from "@utils/String";
import * as moment from "moment";
import { ChannelColors } from "./ChannelColors";
import { LogType } from "./LogType";

export interface IMessage {
  content: string;
  color: string;
  time: Date;
}

export default class Logger {

  public get OnLog() { return this.onLog.expose(); }
  private readonly onLog = new LiteEvent<IMessage>();

  public log(source: string, message: string, color: string | LogType | ChannelColors) {
    if (color === LogType.DEBUG && !GlobalConfiguration.showDebugMessages) {
      return;
    }
    if (!isBlank(source)) {
      this.onLog.trigger({
        color,
        content: `[${moment().format("LTS")}][${source}] ${message}`,
        time: new Date(),
      });
      console.log(`%c[${moment().format("LTS")}][${source}] ${message}`, `color: ${color}; font-style: normal; font-size: 12px`);
    } else {
      this.onLog.trigger({
        color,
        content: `[${moment().format("LTS")}] ${message}`,
        time: new Date(),
      });
      console.log(`%c[${moment().format("LTS")}] ${message}`, `color: ${color}; font-style: normal; font-size: 12px`);
    }
  }

  public logDebug(source: string, message: string) {
    this.log(source, message, LogType.DEBUG);
  }

  public logError(source: string, message: string) {
    this.log(source, message, LogType.ERROR);
  }

  public logInfo(source: string, message: string) {
    this.log(source, message, LogType.INFO);
  }

  public logWarning(source: string, message: string) {
    this.log(source, message, LogType.WARNING);
  }

  public logDofus(source: string, message: string) {
    this.log(source, message, LogType.DOFUS);
  }

  public logMessage(source: string, message: string) {
    this.log(source, message, LogType.MESSAGE);
  }
}
