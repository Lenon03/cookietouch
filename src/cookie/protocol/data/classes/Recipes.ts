import Data from "@/protocol/data/Data";

export default class Recipes extends Data {
  public resultId: number = 0;
  public resultLevel: number = 0;
  public ingredientIds: number[] = [];
  public quantities: number[] = [];
}
