export default class AccountData {
  public username: string;
  public password: string;
  public server: string;
  public character: string;
  public accountCreation: number;
  public accountId: number;
  public communityId: number;
  public hasRights: boolean;
  public login: number;
  public nickname: string;
  public secretQuestion: string;
  public subscriptionEndDate: number;
  public wasAlreadyConnected: boolean;
  public lang: string;

  constructor(username: string, password: string, lang = "fr") {
    this.username = username;
    this.password = password;
    this.lang = lang;
  }
}
