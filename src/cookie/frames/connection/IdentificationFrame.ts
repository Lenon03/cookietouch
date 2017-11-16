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
    this.account.dispatcher.register("IdentificationSuccessMessage", this.HandleIdentificationSuccessMessage, this);
  }

  private async HandleHelloConnectMessage(account: Account, data: any) {
    account.framesData.key = data.key;
    account.framesData.salt = data.salt;

    console.log("Connecté au serveur d'authentification");
    account.network.send("checkAssetsVersion", {
      assetsVersion: DTConstants.assetsVersion,
      staticDataVersion: DTConstants.staticDataVersion,
    });
  }

  private async HandleassetsVersionChecked(account: Account, data: any) {
    account.network.send("login", {
      key: account.framesData.key,
      salt: account.framesData.salt,
      token: account.haapi.token,
      username: account.data.username,
    });
  }

  private async HandleIdentificationSuccessMessage(account: Account, data: any) {
    account.data.accountCreation = data.accountCreation;
    account.data.accountId = data.accountId;
    account.data.communityId = data.communityId;
    account.data.hasRights = data.hasRights;
    account.data.login = data.login;
    account.data.nickname = data.nickname;
    account.data.secretQuestion = data.secretQuestion;
    account.data.subscriptionEndDate = data.subscriptionEndDate;
    account.data.wasAlreadyConnected = data.wasAlreadyConnected;

    console.log("Account", account);
  }
}
