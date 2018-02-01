import Data from "../Data";

export default class Monsters extends Data {
  public _type: string;
  public nameId: string;
  public gfxId: number;
  public race: number;
  public grades: any[];
  public look: string;
  public useSummonSlot: boolean;
  public useBombSlot: boolean;
  public canPlay: boolean;
  public animFunList: object[];
  public canTackle: boolean;
  public isBoss: boolean;
  public drops: object[];
  public subareas: object[];
  public spells: object[];
  public favoriteSubareaId: number;
  public isMiniBoss: boolean;
  public isQuestMonster: boolean;
  public correspondingMiniBossId: number;
}
