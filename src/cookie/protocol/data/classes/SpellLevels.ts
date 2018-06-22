import Data from "@/protocol/data/Data";

export default class SpellLevels extends Data {
  public _type: string;
  public spellId: number;
  public spellBreed: number;
  public apCost: number;
  public minRange: number;
  public range: number;
  public castInLine: boolean;
  public castInDiagonal: boolean;
  public castTestLos: boolean;
  public criticalHitProbability: number;
  public criticalFailureProbability: number;
  public needFreeCell: boolean;
  public needTakenCell: boolean;
  public needFreeTrapCell: boolean;
  public rangeCanBeBoosted: boolean;
  public maxStack: number;
  public maxCastPerTurn: number;
  public maxCastPerTarget: number;
  public minCastInterval: number;
  public initialCooldown: number;
  public globalCooldown: number;
  public minPlayerLevel: number;
  public criticalFailureEndsTurn: boolean;
  public hideEffects: boolean;
  public hidden: boolean;
  public statesRequired: number[];
  public statesForbidden: number[];
  public effects: any[];
  public criticalEffect: any[];
  public canSummon: boolean;
  public canBomb: boolean;
}
