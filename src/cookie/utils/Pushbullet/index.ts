import Account from "@/account";
import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import LanguageManager from "@/configurations/language/LanguageManager";
import {
  IDevices,
  INotificationData,
  IUserInformation,
  NotificationType
} from "@/utils/Pushbullet/types";
import axios, { AxiosInstance } from "axios";

export default class Pushbullet {
  private static httpClient: AxiosInstance;
  public static changeToken(accesToken: string) {
    this.httpClient = axios.create({
      baseURL: "https://api.pushbullet.com/v2/",
      headers: {
        "Access-Token": accesToken
      }
    });
  }

  public static async getInfo(): Promise<IUserInformation> {
    const response = await Pushbullet.httpClient.get("/users/me");
    return response.data;
  }

  public static async getDevices(): Promise<IDevices> {
    const response = await Pushbullet.httpClient.get("/devices");
    return response.data;
  }

  public static async push(title: string, body: string) {
    const response = await Pushbullet.httpClient.post("/pushes", {
      body,
      title,
      type: "note"
    });
    return response.data;
  }

  public static async sendNotification(
    type: NotificationType,
    account: Account,
    data?: INotificationData
  ) {
    if (
      GlobalConfiguration.pushBulletAccessToken === "" ||
      !account.config.pushBullet.active
    ) {
      return;
    }
    let title = `[${account.game.character.name}]`;
    let body = "";
    switch (type) {
      case NotificationType.LEVEL: {
        if (!account.config.pushBullet.level) {
          return;
        }
        if (!data || (data && !data.level)) {
          throw new Error("We have to pass the level");
        }
        title += ` ${LanguageManager.trans("levelUp")}`;
        body = `${LanguageManager.trans("levelUpBody")} ${data.level}`;
        break;
      }
      case NotificationType.DISCONNECT: {
        if (!account.config.pushBullet.disconnect) {
          return;
        }
        title += ` ${LanguageManager.trans("disconnect")}`;
        body = `${LanguageManager.trans("disconnectBody")}`;
        break;
      }
      case NotificationType.CAPTCHA_REQUEST: {
        if (!account.config.pushBullet.captchaRequest) {
          return;
        }
        title += ` ${LanguageManager.trans("recaptchaReceived")}`;
        body = `${LanguageManager.trans("recaptchaReceivedBody")}`;
        break;
      }
      case NotificationType.IN_JAIL: {
        if (!account.config.pushBullet.inJail) {
          return;
        }
        title += ` ${LanguageManager.trans("inJail")}`;
        body = `${LanguageManager.trans("inJailBody")}`;
        break;
      }
      case NotificationType.MOD_ON_MAP: {
        if (!account.config.pushBullet.modOnMap) {
          return;
        }
        if (!data || (data && !data.senderName)) {
          throw new Error("We have to pass the moderator name");
        }
        title += ` ${LanguageManager.trans("modOnMap")}`;
        body = `${LanguageManager.trans("modOnMapBody")} ${data.senderName}`;
        break;
      }
      case NotificationType.MOD_PRIVATE_MESSAGE: {
        if (!account.config.pushBullet.modPrivateMessage) {
          return;
        }
        if (!data || (data && !data.senderName)) {
          throw new Error("We have to pass the sender name");
        }
        if (!data || (data && !data.message)) {
          throw new Error("We have to pass the message");
        }
        title += ` ${LanguageManager.trans("modMessage")}`;
        body = `${LanguageManager.trans(
          "modMessageBody",
          data.senderName,
          data.message
        )}`;
        break;
      }
      case NotificationType.PRIVATE_MESSAGE: {
        if (!account.config.pushBullet.privateMessage) {
          return;
        }
        if (!data || (data && !data.senderName)) {
          throw new Error("We have to pass the sender name");
        }
        if (!data || (data && !data.message)) {
          throw new Error("We have to pass the message");
        }
        title += ` ${LanguageManager.trans("privateMessage")}`;
        body = `${LanguageManager.trans(
          "privateMessageBody",
          data.senderName,
          data.message
        )}`;
        break;
      }
    }
    return Pushbullet.push(title, body);
  }
}
