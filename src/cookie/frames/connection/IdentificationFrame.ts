import LanguageManager from "@/configurations/language/LanguageManager";
import { NetworkPhases } from "@/network/NetworkPhases";
import { IdentificationFailureReasonEnum } from "@/protocol/enums/IdentificationFailureReasonEnum";
import IdentificationFailedBannedMessage from "@/protocol/network/messages/IdentificationFailedBannedMessage";
import IdentificationFailedMessage from "@/protocol/network/messages/IdentificationFailedMessage";
import Account from "@account";
import DTConstants from "@protocol/DTConstants";
import * as moment from "moment";

export default class IdentificationFrame {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.register();
  }

  private register() {
    this.account.dispatcher.register(
      "HelloConnectMessage",
      this.HandleHelloConnectMessage,
      this
    );
    this.account.dispatcher.register(
      "assetsVersionChecked",
      this.HandleassetsVersionChecked,
      this
    );
    this.account.dispatcher.register(
      "ConnectionFailedMessage",
      this.HandleConnectionFailedMessage,
      this
    );
    this.account.dispatcher.register(
      "IdentificationSuccessMessage",
      this.HandleIdentificationSuccessMessage,
      this
    );
    this.account.dispatcher.register(
      "IdentificationFailedBannedMessage",
      this.HandleIdentificationFailedBannedMessage,
      this
    );
    this.account.dispatcher.register(
      "IdentificationFailedMessage",
      this.HandleIdentificationFailedMessage,
      this
    );
  }

  private async HandleHelloConnectMessage(account: Account, message: any) {
    account.network.phase = NetworkPhases.LOGIN;
    account.framesData.key = message.key;
    account.framesData.salt = message.salt;

    this.account.logger.logDebug(
      LanguageManager.trans("identificationFrame"),
      LanguageManager.trans("connectedAuth")
    );
    account.network.send("checkAssetsVersion", {
      assetsVersion: DTConstants.assetsVersion,
      staticDataVersion: DTConstants.staticDataVersion
    });
  }

  private async HandleassetsVersionChecked(account: Account, message: any) {
    account.network.send("login", {
      key: account.framesData.key,
      salt: account.framesData.salt,
      token: account.haapi.token,
      username: account.accountConfig.username
    });
  }

  private async HandleConnectionFailedMessage(account: Account, message: any) {
    account.logger.logError(
      LanguageManager.trans("identificationFrame"),
      message.reason
    );
  }

  private async HandleIdentificationSuccessMessage(
    account: Account,
    message: any
  ) {
    account.data.accountCreation = message.accountCreation;
    account.data.accountId = message.accountId;
    account.data.communityId = message.communityId;
    account.data.hasRights = message.hasRights;
    account.data.login = message.login;
    account.data.nickname = message.nickname;
    account.data.secretQuestion = message.secretQuestion;
    account.data.subscriptionEndDate =
      message.subscriptionEndDate === 0
        ? null
        : moment()
            .add(
              Math.floor(
                (message.subscriptionEndDate - Date.now()) / 1000 / 60 / 60 / 24
              ),
              "days"
            )
            .toDate();
    account.data.wasAlreadyConnected = message.wasAlreadyConnected;
  }

  private async HandleIdentificationFailedBannedMessage(
    account: Account,
    message: IdentificationFailedBannedMessage
  ) {
    const date = new Date(message.banEndDate);
    account.logger.logError(
      LanguageManager.trans("identificationFrame"),
      `${
        IdentificationFailureReasonEnum[message.reason]
      } [${date.toDateString()}]`
    );
  }

  private async HandleIdentificationFailedMessage(
    account: Account,
    message: IdentificationFailedMessage
  ) {
    switch (message.reason as IdentificationFailureReasonEnum) {
      case IdentificationFailureReasonEnum.BANNED:
        account.logger.logError(
          LanguageManager.trans("identificationFrame"),
          LanguageManager.trans("accountBan")
        );
        break;
    }
  }
}
