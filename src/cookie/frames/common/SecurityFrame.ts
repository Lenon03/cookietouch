import LanguageManager from "@/configurations/language/LanguageManager";
import Account from "@account";

export default class SecurityFrame {

  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.register();
  }

  private register() {
    this.account.dispatcher.register("RecaptchaRequestMessage", this.HandleRecaptchaRequestMessage, this);
    this.account.dispatcher.register("SequenceNumberRequestMessage", this.HandleSequenceNumberRequestMessage, this);
    this.account.dispatcher.register("BasicLatencyStatsRequestMessage", this.HandleBasicLatencyStatsRequestMessage, this);
    this.account.dispatcher.register("TextInformationMessage", this.HandleTextInformationMessage, this);
    this.account.dispatcher.register("AccountLoggingKickedMessage", this.HandleAccountLoggingKickedMessage, this);
    this.account.dispatcher.register("_ErrorPopupMessage", this.Handle_ErrorPopupMessage, this);
  }

  private async HandleRecaptchaRequestMessage(account: Account, data: any) {
    account.framesData.captchasCounter++;
    account.logger.logWarning(LanguageManager.trans("recaptcha"), LanguageManager.trans("recaptchaReceived"));
    await account.handleRecaptcha(data.enrichData.sitekey);
  }

  private async HandleSequenceNumberRequestMessage(account: Account, data: any) {
    account.framesData.sequence++;
    account.network.sendMessageFree("SequenceNumberMessage", {
      number: account.framesData.sequence,
    });
  }

  private async HandleBasicLatencyStatsRequestMessage(account: Account, data: any) {
    await account.network.sendMessageFree("BasicLatencyStatsMessage", {
      latency: 262,
      max: 50,
      sampleCount: 12,
    });
  }

  private async HandleTextInformationMessage(account: Account, data: any) {
    if (data.msgId === 245) {
      this.account.logger.logDebug(LanguageManager.trans("securityFrame"), LanguageManager.trans("dailyFightsLimit"));
      if (this.account.config.disconnectUponFightsLimit) {
        this.account.stop();
      }
    }
  }

  private async HandleAccountLoggingKickedMessage(account: Account, data: any) {
    this.account.logger
      .logDebug(LanguageManager.trans("securityFrame"), LanguageManager.trans("kickedTime", data.days, data.hours, data.minutes));
  }

  private async Handle_ErrorPopupMessage(account: Account, data: any) {
    this.account.logger.logError(data.title, data.text);
  }
}
