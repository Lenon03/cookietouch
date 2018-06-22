import Type from "@/protocol/network/types/Type";

export default class GameRolePlayNpcQuestFlag extends Type {
  public contextualId: number;
  public disposition: any[];
  public look: any[];
  public npcId: number;
  public questFlag: any[];
  public sex: boolean;
  public specialArtworkId: number;

  constructor() {
    super();
  }
}
