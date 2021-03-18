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

  constructor(
    contextualId = 0,
    disposition: any[] = [],
    look: any[] = [],
    npcId = 0,
    questFlag: GameRolePlayNpcQuestFlag[] = [],
    sex = false,
    specialArtworkId = 0
  ) {
    super();
    this.contextualId = contextualId;
    this.disposition = disposition;
    this.look = look;
    this.npcId = npcId;
    this.questFlag = questFlag;
    this.sex = sex;
    this.specialArtworkId = specialArtworkId;
  }
}
