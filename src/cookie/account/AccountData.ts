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
  public subscriptionEndDate: Date;
  public wasAlreadyConnected: boolean;
  public lang: string;

  get isSubscriber(): boolean {
    return new Date() < this.subscriptionEndDate;
  }

  constructor(username: string, password: string, lang = "fr", server = "", character = "", nickname = "") {
    this.username = username;
    this.password = password;
    this.lang = lang;
    this.server = server;
    this.character = character;
    this.nickname = nickname;
  }
}
