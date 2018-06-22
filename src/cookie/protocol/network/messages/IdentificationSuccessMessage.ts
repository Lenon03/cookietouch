import Message from "@/protocol/network/messages/Message";

export default class IdentificationSuccessMessage extends Message {
  public login: string;
  public nickname: string;
  public accountId: number;
  public communityId: number;
  public hasRights: boolean;
  public secretQuestion: string;
  public subscriptionEndDate: number;
  public wasAlreadyConnected: boolean;
  public accountCreation: number;

  constructor(login = "", nickname = "", accountId = 0, communityId = 0, hasRights = false,
              secretQuestion = "", subscriptionEndDate = 0, wasAlreadyConnected = false, accountCreation = 0) {
    super();
    this.login = login;
    this.nickname = nickname;
    this.accountId = accountId;
    this.communityId = communityId;
    this.hasRights = hasRights;
    this.secretQuestion = secretQuestion;
    this.subscriptionEndDate = subscriptionEndDate;
    this.wasAlreadyConnected = wasAlreadyConnected;
    this.accountCreation = accountCreation;

  }
}
