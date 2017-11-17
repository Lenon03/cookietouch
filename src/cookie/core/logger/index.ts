import { ChannelColors } from "./ChannelColors";
import { LogType } from "./LogType";

export default class Logger {
  public log(source: string, message: string, color: string | LogType | ChannelColors) {
    if (source && source !== "") {
      console.log(`%c[${source}]${message}`, `color: ${color}; font-style: normal; font-size: 12px`);
    } else {
      console.log(`%c${message}`, `color: ${color}; font-style: normal; font-size: 12px`);
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
