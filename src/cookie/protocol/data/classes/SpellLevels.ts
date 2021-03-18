import Data from "@/protocol/data/Data";

export default class SpellLevels extends Data {
  public _type: string = "";
  public spellId: number = 0;
  public spellBreed: number = 0;
  public apCost: number = 0;
  public minRange: number = 0;
  public range: number = 0;
  public castInLine: boolean = false;
  public castInDiagonal: boolean = false;
  public castTestLos: boolean = false;
  public criticalHitProbability: number = 0;
  public criticalFailureProbability: number = 0;
  public needFreeCell: boolean = false;
  public needTakenCell: boolean = false;
  public needFreeTrapCell: boolean = false;
  public rangeCanBeBoosted: boolean = false;
  public maxStack: number = 0;
  public maxCastPerTurn: number = 0;
  public maxCastPerTarget: number = 0;
  public minCastInterval: number = 0;
  public initialCooldown: number = 0;
  public globalCooldown: number = 0;
  public minPlayerLevel: number = 0;
  public criticalFailureEndsTurn: boolean = false;
  public hideEffects: boolean = false;
  public hidden: boolean = false;
  public statesRequired: number[] = [];
  public statesForbidden: number[] = [];
  public effects: any[] = [];
  public criticalEffect: any[] = [];
  public canSummon: boolean = false;
  public canBomb: boolean = false;
}
