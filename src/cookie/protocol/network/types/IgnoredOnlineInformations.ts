import IgnoredInformations from "./IgnoredInformations";

export default class IgnoredOnlineInformations extends IgnoredInformations {
  public playerId: number;
  public playerName: string;
  public breed: number;
  public sex: boolean;

  constructor(accountId = 0, accountName = "", playerId = 0, playerName = "", breed = 0, sex = false) {
    super(accountId, accountName);
    this.playerId = playerId;
    this.playerName = playerName;
    this.breed = breed;
    this.sex = sex;

  }
}
