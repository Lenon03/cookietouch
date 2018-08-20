import Account from "@/account";
import LanguageManager from "@/configurations/language/LanguageManager";
import Frames, { IFrame } from "@/frames";
import { NetworkPhases } from "@/network/NetworkPhases";
import DTConstants from "@/protocol/DTConstants";
import { IdentificationFailureReasonEnum } from "@/protocol/enums/IdentificationFailureReasonEnum";
import IdentificationFailedBannedMessage from "@/protocol/network/messages/IdentificationFailedBannedMessage";
import IdentificationFailedMessage from "@/protocol/network/messages/IdentificationFailedMessage";
import moment from "moment";

export default class IdentificationFrame implements IFrame {
  public register() {
    Frames.dispatcher.register(
      "HelloConnectMessage",
      this.HandleHelloConnectMessage,
      this
    );
    Frames.dispatcher.register(
      "assetsVersionChecked",
      this.HandleassetsVersionChecked,
      this
    );
    Frames.dispatcher.register(
      "ConnectionFailedMessage",
      this.HandleConnectionFailedMessage,
      this
    );
    Frames.dispatcher.register(
      "IdentificationSuccessMessage",
      this.HandleIdentificationSuccessMessage,
      this
    );
    Frames.dispatcher.register(
      "IdentificationFailedBannedMessage",
      this.HandleIdentificationFailedBannedMessage,
      this
    );
    Frames.dispatcher.register(
      "IdentificationFailedMessage",
      this.HandleIdentificationFailedMessage,
      this
    );
  }

  private async HandleHelloConnectMessage(account: Account, message: any) {
    account.network.phase = NetworkPhases.LOGIN;
    account.framesData.key = message.key;
    account.framesData.salt = message.salt;

    account.logger.logDebug(
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
            .add(message.subscriptionEndDate - Date.now(), "ms")
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
