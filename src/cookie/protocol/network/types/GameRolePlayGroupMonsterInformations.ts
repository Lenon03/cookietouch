import EntityDispositionInformations from "./EntityDispositionInformations";
import EntityLook from "./EntityLook";
import GameRolePlayActorInformations from "./GameRolePlayActorInformations";
import GroupMonsterStaticInformations from "./GroupMonsterStaticInformations";

export default class GameRolePlayGroupMonsterInformations extends GameRolePlayActorInformations {
  public staticInfos: GroupMonsterStaticInformations;
  public ageBonus: number;
  public lootShare: number;
  public alignmentSide: number;
  public keyRingBonus: boolean;
  public hasHardcoreDrop: boolean;
  public hasAVARewardToken: boolean;

  constructor(contextualId = 0, look: EntityLook = null, disposition: EntityDispositionInformations = null,
              staticInfos: GroupMonsterStaticInformations = null, ageBonus = 0, lootShare = 0, alignmentSide = 0,
              keyRingBonus = false, hasHardcoreDrop = false, hasAVARewardToken = false) {
    super(contextualId, look, disposition);
    this.ageBonus = ageBonus;
    this.lootShare = lootShare;
    this.alignmentSide = alignmentSide;
    this.keyRingBonus = keyRingBonus;
    this.hasHardcoreDrop = hasHardcoreDrop;
    this.hasAVARewardToken = hasAVARewardToken;
  }
}
