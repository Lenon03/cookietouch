import Data from "@/protocol/data/Data";

export default class Breeds extends Data {
  public shortNameId: string;
  public longNameId: string;
  public descriptionId: string;
  public gameplayDescriptionId: string;
  public maleLook: string;
  public femaleLook: string;
  public creatureBonesId: number;
  public maleArtwork: number;
  public femaleArtwork: number;
  public statsPointsForStrength: number[][];
  public statsPointsForIntelligence: number[][];
  public statsPointsForChance: number[][];
  public statsPointsForAgility: number[][];
  public statsPointsForVitality: number[][];
  public statsPointsForWisdom: number[][];
  public breedSpellsId: number[];
  public maleColors: number[];
  public femaleColors: number[];
}
