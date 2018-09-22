import Data from "@/protocol/data/Data";

export default class Npcs extends Data {
  public _type: string = "";
  public nameId: string = "";
  public dialogMessages: number[][] = [];
  public dialogReplies: number[][] = [];
  public actions: number[] = [];
  public actionsName: string[] = [];
  public gender: number = 0;
  public look: string = "";
  public animFunList: object[] = [];
}
