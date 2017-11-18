import CharacterMinimalInformations from "./CharacterMinimalInformations";
import PlayerStatus from "./PlayerStatus";
export default class GuildMember extends CharacterMinimalInformations {
  public breed: number;
  public sex: boolean;
  public rank: number;
  public givenExperience: number;
  public experienceGivenPercent: number;
  public rights: number;
  public connected: number;
  public alignmentSide: number;
  public hoursSinceLastConnection: number;
  public moodSmileyId: number;
  public accountId: number;
  public achievementPoints: number;
  public status: PlayerStatus;
  constructor(id = 0, level = 0, name = "", breed = 0, sex = false, rank = 0,
              givenExperience = 0, experienceGivenPercent = 0, rights = 0, connected = 99,
              alignmentSide = 0, hoursSinceLastConnection = 0, moodSmileyId = 0, accountId = 0,
              achievementPoints = 0, status: PlayerStatus = null) {
    super(id, level, name);
    this.breed = breed;
    this.sex = sex;
    this.rank = rank;
    this.givenExperience = givenExperience;
    this.experienceGivenPercent = experienceGivenPercent;
    this.rights = rights;
    this.connected = connected;
    this.alignmentSide = alignmentSide;
    this.hoursSinceLastConnection = hoursSinceLastConnection;
    this.moodSmileyId = moodSmileyId;
    this.accountId = accountId;
    this.achievementPoints = achievementPoints;
    this.status = status;

  }
}
