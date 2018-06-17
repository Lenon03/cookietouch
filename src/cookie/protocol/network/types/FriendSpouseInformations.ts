import BasicGuildInformations from "./BasicGuildInformations";
import EntityLook from "./EntityLook";
import Type from "./Type";

export default class FriendSpouseInformations extends Type {
  public spouseAccountId: number;
  public spouseId: number;
  public spouseName: string;
  public spouseLevel: number;
  public breed: number;
  public sex: number;
  public spouseEntityLook: EntityLook;
  public guildInfo: BasicGuildInformations;
  public alignmentSide: number;

  constructor(spouseAccountId = 0, spouseId = 0, spouseName = "", spouseLevel = 0, breed = 0, sex = 0,
              spouseEntityLook: EntityLook, guildInfo: BasicGuildInformations, alignmentSide = 0) {
    super();
    this.spouseAccountId = spouseAccountId;
    this.spouseId = spouseId;
    this.spouseName = spouseName;
    this.spouseLevel = spouseLevel;
    this.breed = breed;
    this.sex = sex;
    this.spouseEntityLook = spouseEntityLook;
    this.guildInfo = guildInfo;
    this.alignmentSide = alignmentSide;

  }
}
