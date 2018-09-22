import Data from "@/protocol/data/Data";

export default class CensoredWords extends Data {
  public listId: number = 0;
  public language: string = "";
  public word: string = "";
  public deepLooking: boolean = false;
}
