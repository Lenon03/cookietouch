import Data from "@/protocol/data/Data";

export default class Recipes extends Data {
  public resultId: number;
  public resultLevel: number;
  public ingredientIds: number[];
  public quantities: number[];
}
