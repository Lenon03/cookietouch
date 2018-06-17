import Data from "../Data";

export default class CensoredWords extends Data {
  public listId: number;
  public language: string;
  public word: string;
  public deepLooking: boolean;
}
