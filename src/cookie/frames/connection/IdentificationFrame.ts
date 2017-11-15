import Account from "../../Account";
import DTConstants from "../../protocol/DTConstants";

export default class IdentificationFrame {

  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.register();
  }

  private register() {
    this.account.dispatcher.register("HelloConnectMessage", this.HandleHelloConnectMessage, this);
    this.account.dispatcher.register("assetsVersionChecked", this.HandleassetsVersionChecked, this);
    this.account.dispatcher.register("IdentificationSuccessMessage", this.HandleIdentificationSuccessMessage, this);
  }

  private async HandleHelloConnectMessage(account: Account, data: any) {
    account.key = data.key;
    account.salt = data.salt;

    console.log("Connecté au serveur d'authentification");
    account.network.send("checkAssetsVersion", {
      assetsVersion: DTConstants.assetsVersion,
      staticDataVersion: DTConstants.staticDataVersion,
    });
  }

  private async HandleassetsVersionChecked(account: Account, data: any) {
    account.network.send("login", {
      key: account.key,
      salt: account.salt,
      token: account.haapi.token,
      username: account.username,
    });
  }

  private async HandleIdentificationSuccessMessage(account: Account, data: any) {
    account.accountCreation = data.accountCreation;
    account.accountId = data.accountId;
    account.communityId = data.communityId;
    account.hasRights = data.hasRights;
    account.login = data.login;
    account.nickname = data.nickname;
    account.secretQuestion = data.secretQuestion;
    account.subscriptionEndDate = data.subscriptionEndDate;
    account.wasAlreadyConnected = data.wasAlreadyConnected;

    console.log("Account", account);
  }
}
