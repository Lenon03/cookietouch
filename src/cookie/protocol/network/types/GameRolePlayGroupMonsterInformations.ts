import EntityDispositionInformations from "@/protocol/network/types/EntityDispositionInformations";
import EntityLook from "@/protocol/network/types/EntityLook";
import GameRolePlayActorInformations from "@/protocol/network/types/GameRolePlayActorInformations";
import GroupMonsterStaticInformations from "@/protocol/network/types/GroupMonsterStaticInformations";

export default class GameRolePlayGroupMonsterInformations extends GameRolePlayActorInformations {
  public staticInfos: GroupMonsterStaticInformations;
  public ageBonus: number;
  public lootShare: number;
  public alignmentSide: number;
  public keyRingBonus: boolean;
  public hasHardcoreDrop: boolean;
  public hasAVARewardToken: boolean;

  constructor(
    contextualId = 0,
    look = new EntityLook(),
    disposition = new EntityDispositionInformations(),
    staticInfos = new GroupMonsterStaticInformations(),
    ageBonus = 0,
    lootShare = 0,
    alignmentSide = 0,
    keyRingBonus = false,
    hasHardcoreDrop = false,
    hasAVARewardToken = false
  ) {
    super(contextualId, look, disposition);
    this.staticInfos = staticInfos;
    this.ageBonus = ageBonus;
    this.lootShare = lootShare;
    this.alignmentSide = alignmentSide;
    this.keyRingBonus = keyRingBonus;
    this.hasHardcoreDrop = hasHardcoreDrop;
    this.hasAVARewardToken = hasAVARewardToken;
  }
}
