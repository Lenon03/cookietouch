import BasicGuildInformations from "./BasicGuildInformations";
import EntityLook from "./EntityLook";
import FriendSpouseInformations from "./FriendSpouseInformations";

export default class FriendSpouseOnlineInformations extends FriendSpouseInformations {
  public mapId: number;
  public subAreaId: number;
  public inFight: boolean;
  public followSpouse: boolean;

  constructor(spouseAccountId = 0, spouseId = 0, spouseName = "",
              spouseLevel = 0, breed = 0, sex = 0, spouseEntityLook: EntityLook,
              guildInfo: BasicGuildInformations, alignmentSide = 0, mapId = 0, subAreaId = 0,
              inFight = false, followSpouse = false) {
    super(spouseAccountId, spouseId, spouseName, spouseLevel, breed, sex, spouseEntityLook, guildInfo, alignmentSide);
    this.mapId = mapId;
    this.subAreaId = subAreaId;
    this.inFight = inFight;
    this.followSpouse = followSpouse;

  }
}
