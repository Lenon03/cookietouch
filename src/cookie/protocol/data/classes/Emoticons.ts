import Data from "@/protocol/data/Data";

export default class Emoticons extends Data {
  public nameId: string = "";
  public shortcutId: string = "";
  public order: number = 0;
  public defaultAnim: string = "";
  public persistancy: boolean = false;
  public eight_directions: boolean = false;
  public aura: boolean = false;
  public anims: string[] = [];
  public cooldown: number = 0;
  public duration: number = 0;
  public weight: number = 0;
}
