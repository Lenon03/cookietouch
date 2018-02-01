import AbstractContactInformations from "./AbstractContactInformations";

export default class FriendInformations extends AbstractContactInformations {
  public playerState: number;
  public lastConnection: number;
  public achievementPoints: number;

  constructor(accountId = 0, accountName = "", playerState = 99, lastConnection = 0, achievementPoints = 0) {
    super(accountId, accountName);
    this.playerState = playerState;
    this.lastConnection = lastConnection;
    this.achievementPoints = achievementPoints;

  }
}
