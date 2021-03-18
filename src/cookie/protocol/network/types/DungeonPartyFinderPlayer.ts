import Type from "@/protocol/network/types/Type";

export default class DungeonPartyFinderPlayer extends Type {

  public playerid: number;
  public playername: string;
  public breed: number;
  public sex: boolean;
  public level: number;

  constructor(playerid = 0, playername = "", breed = 0, sex = false, level = 0) {
    super();
    this.playerid = playerid;
    this.playername = playername;
    this.breed = breed;
    this.sex = sex;
    this.level = level;
  }
}
