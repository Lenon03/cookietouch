import Data from "../Data";

export default class Emoticons extends Data {
  public nameId: string;
  public shortcutId: string;
  public order: number;
  public defaultAnim: string;
  public persistancy: boolean;
  public eight_directions: boolean;
  public aura: boolean;
  public anims: string[];
  public cooldown: number;
  public duration: number;
  public weight: number;
}
