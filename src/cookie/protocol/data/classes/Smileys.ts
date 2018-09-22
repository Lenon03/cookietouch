import Data from "@/protocol/data/Data";

export default class Smileys extends Data {
  public order: number = 0;
  public gfxId: string = "";
  public forPlayers: boolean = false;
  public triggers: string[] = [];
}
