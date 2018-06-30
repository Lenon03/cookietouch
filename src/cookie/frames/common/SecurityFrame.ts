import Account from "@/account";
import LanguageManager from "@/configurations/language/LanguageManager";
import Frames, { IFrame } from "@/frames";

export default class SecurityFrame implements IFrame {
  public register() {
    Frames.dispatcher.register(
      "RecaptchaRequestMessage",
      this.HandleRecaptchaRequestMessage,
      this
    );
    Frames.dispatcher.register(
      "SequenceNumberRequestMessage",
      this.HandleSequenceNumberRequestMessage,
      this
    );
    Frames.dispatcher.register(
      "BasicLatencyStatsRequestMessage",
      this.HandleBasicLatencyStatsRequestMessage,
      this
    );
    Frames.dispatcher.register(
      "TextInformationMessage",
      this.HandleTextInformationMessage,
      this
    );
    Frames.dispatcher.register(
      "AccountLoggingKickedMessage",
      this.HandleAccountLoggingKickedMessage,
      this
    );
    Frames.dispatcher.register(
      "_ErrorPopupMessage",
      this.Handle_ErrorPopupMessage,
      this
    );
  }

  private async HandleRecaptchaRequestMessage(account: Account, data: any) {
    account.framesData.captchasCounter++;
    account.logger.logWarning(
      LanguageManager.trans("recaptcha"),
      LanguageManager.trans("recaptchaReceived")
    );
    await account.handleRecaptcha(data.enrichData.sitekey);
  }

  private async HandleSequenceNumberRequestMessage(
    account: Account,
    data: any
  ) {
    account.framesData.sequence++;
    account.network.sendMessageFree("SequenceNumberMessage", {
      number: account.framesData.sequence
    });
  }

  private async HandleBasicLatencyStatsRequestMessage(
    account: Account,
    data: any
  ) {
    await account.network.sendMessageFree("BasicLatencyStatsMessage", {
      latency: 262,
      max: 50,
      sampleCount: 12
    });
  }

  private async HandleTextInformationMessage(account: Account, data: any) {
    if (data.msgId === 245) {
      account.logger.logDebug(
        LanguageManager.trans("securityFrame"),
        LanguageManager.trans("dailyFightsLimit")
      );
      if (account.config.disconnectUponFightsLimit) {
        account.stop();
      }
    }
  }

  private async HandleAccountLoggingKickedMessage(account: Account, data: any) {
    account.logger.logDebug(
      LanguageManager.trans("securityFrame"),
      LanguageManager.trans("kickedTime", data.days, data.hours, data.minutes)
    );
  }

  private async Handle_ErrorPopupMessage(account: Account, data: any) {
    account.logger.logError(data.title, data.text);
  }
}
