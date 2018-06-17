import Data from "../Data";

export default class Items extends Data {
  public _type: string;
  public nameId: string;
  public typeId: number;
  public descriptionId: string;
  public iconId: number;
  public level: number;
  public realWeight: number;
  public cursed: boolean;
  public useAnimationId: number;
  public usable: boolean;
  public targetable: boolean;
  public exchangeable: boolean;
  public price: number;
  public twoHanded: boolean;
  public etheral: boolean;
  public itemSetId: number;
  public criteria: string;
  public criteriaTarget: string;
  public hideEffects: boolean;
  public enhanceable: boolean;
  public nonUsableOnAnother: boolean;
  public appearanceId: number;
  public secretRecipe: boolean;
  public recipeSlots: number;
  public recipeIds: object[];
  public dropMonsterIds: object[];
  public bonusIsSecret: boolean;
  public possibleEffects: any[];
  public favoriteSubAreas: object[];
  public favoriteSubAreasBonus: number;
  public range: number;
}
