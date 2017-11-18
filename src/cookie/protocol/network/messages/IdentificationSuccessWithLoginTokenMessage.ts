import IdentificationSuccessMessage from "./IdentificationSuccessMessage";
export default class IdentificationSuccessWithLoginTokenMessage extends IdentificationSuccessMessage {
  public loginToken: string;
  constructor(login = "", nickname = "", accountId = 0, communityId = 0,
              hasRights = false, secretQuestion = "", subscriptionEndDate = 0,
              wasAlreadyConnected = false, accountCreation = 0, loginToken = "") {
    super(login, nickname, accountId, communityId, hasRights, secretQuestion, subscriptionEndDate, wasAlreadyConnected, accountCreation);
    this.loginToken = loginToken;

  }
}
