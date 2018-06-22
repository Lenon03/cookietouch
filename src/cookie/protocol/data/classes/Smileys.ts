import Data from "@/protocol/data/Data";

export default class Smileys extends Data {
  public order: number;
  public gfxId: string;
  public forPlayers: boolean;
  public triggers: string[];
}
