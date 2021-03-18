import Data from "@/protocol/data/Data";

export default class Items extends Data {
  public _type: string = "";
  public nameId: string = "";
  public typeId: number = 0;
  public descriptionId: string = "";
  public iconId: number = 0;
  public level: number = 0;
  public realWeight: number = 0;
  public cursed: boolean = false;
  public useAnimationId: number = 0;
  public usable: boolean = false;
  public targetable: boolean = false;
  public exchangeable: boolean = false;
  public price: number = 0;
  public twoHanded: boolean = false;
  public etheral: boolean = false;
  public itemSetId: number = 0;
  public criteria: string = "";
  public criteriaTarget: string = "";
  public hideEffects: boolean = false;
  public enhanceable: boolean = false;
  public nonUsableOnAnother: boolean = false;
  public appearanceId: number = 0;
  public secretRecipe: boolean = false;
  public recipeSlots: number = 0;
  public recipeIds: object[] = [];
  public dropMonsterIds: object[] = [];
  public bonusIsSecret: boolean = false;
  public possibleEffects: any[] = [];
  public favoriteSubAreas: object[] = [];
  public favoriteSubAreasBonus: number = 0;
  public range: number = 0;
}
