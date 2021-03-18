import Data from "@/protocol/data/Data";

export default class Monsters extends Data {
  public _type: string = "";
  public nameId: string = "";
  public gfxId: number = 0;
  public race: number = 0;
  public grades: any[] = [];
  public look: string = "";
  public useSummonSlot: boolean = false;
  public useBombSlot: boolean = false;
  public canPlay: boolean = false;
  public animFunList: object[] = [];
  public canTackle: boolean = false;
  public isBoss: boolean = false;
  public drops: object[] = [];
  public subareas: object[] = [];
  public spells: object[] = [];
  public favoriteSubareaId: number = 0;
  public isMiniBoss: boolean = false;
  public isQuestMonster: boolean = false;
  public correspondingMiniBossId: number = 0;
}
