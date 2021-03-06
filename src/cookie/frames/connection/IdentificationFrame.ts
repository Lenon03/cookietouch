import { NetworkPhases } from "@/network/NetworkPhases";
import Account from "@account";
import DTConstants from "@protocol/DTConstants";

export default class IdentificationFrame {

  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.register();
  }

  private register() {
    this.account.dispatcher.register("HelloConnectMessage", this.HandleHelloConnectMessage, this);
    this.account.dispatcher.register("assetsVersionChecked", this.HandleassetsVersionChecked, this);
    this.account.dispatcher.register("ConnectionFailedMessage", this.HandleConnectionFailedMessage, this);
    this.account.dispatcher.register("IdentificationSuccessMessage", this.HandleIdentificationSuccessMessage, this);
  }

  private async HandleHelloConnectMessage(account: Account, message: any) {
    account.network.phase = NetworkPhases.LOGIN;
    account.framesData.key = message.key;
    account.framesData.salt = message.salt;

    this.account.logger.logDebug("", "Connecté au serveur d'authentification");
    account.network.send("checkAssetsVersion", {
      assetsVersion: DTConstants.assetsVersion,
      staticDataVersion: DTConstants.staticDataVersion,
    });
  }

  private async HandleassetsVersionChecked(account: Account, message: any) {
    account.network.send("login", {
      key: account.framesData.key,
      salt: account.framesData.salt,
      token: account.haapi.token,
      username: account.data.username,
    });
  }

  private async HandleConnectionFailedMessage(account: Account, message: any) {
    account.logger.logError("", message.reason);
  }

  private async HandleIdentificationSuccessMessage(account: Account, message: any) {
    account.data.accountCreation = message.accountCreation;
    account.data.accountId = message.accountId;
    account.data.communityId = message.communityId;
    account.data.hasRights = message.hasRights;
    account.data.login = message.login;
    account.data.nickname = message.nickname;
    account.data.secretQuestion = message.secretQuestion;
    account.data.subscriptionEndDate = message.subscriptionEndDate;
    account.data.wasAlreadyConnected = message.wasAlreadyConnected;

    console.log("Account", account);
  }
}
