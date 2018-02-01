import GameRolePlayNpcQuestFlag from "./GameRolePlayNpcQuestFlag";
import Type from "./Type";

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
