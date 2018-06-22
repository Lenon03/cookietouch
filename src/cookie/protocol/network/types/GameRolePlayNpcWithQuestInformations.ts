import GameRolePlayNpcQuestFlag from "@/protocol/network/types/GameRolePlayNpcQuestFlag";
import Type from "@/protocol/network/types/Type";

export default class GameRolePlayNpcWithQuestInformations extends Type {
  public contextualId: number;
  public disposition: any[];
  public look: any[];
  public npcId: number;
  public questFlag: GameRolePlayNpcQuestFlag[];
  public sex: boolean;
  public specialArtworkId: number;

  constructor() {
    super();
  }
}
