export default class DungeonPartyFinderPlayer {

  public playerid: number;
  public playername: string;
  public breed: number;
  public sex: boolean;
  public level: number;

  constructor(playerid = 0, playername = "", breed = 0, sex = false, level = 0) {
    this.playerid = playerid;
    this.playername = playername;
    this.breed = breed;
    this.sex = sex;
    this.level = level;
  }
}
