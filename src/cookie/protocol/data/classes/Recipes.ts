import Data from "../Data";

export default class Recipes extends Data {
  public resultId: number;
  public resultLevel: number;
  public ingredientIds: number[];
  public quantities: number[];
}
