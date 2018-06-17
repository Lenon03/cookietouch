import Message from "./Message";

export default class GuildInformationsGeneralMessage extends Message {
  public enabled: boolean;
  public abandonnedPaddock: boolean;
  public level: number;
  public expLevelFloor: number;
  public experience: number;
  public expNextLevelFloor: number;
  public creationDate: number;

  constructor(enabled = false, abandonnedPaddock = false, level = 0, expLevelFloor = 0, experience = 0, expNextLevelFloor = 0, creationDate = 0) {
    super();
    this.enabled = enabled;
    this.abandonnedPaddock = abandonnedPaddock;
    this.level = level;
    this.expLevelFloor = expLevelFloor;
    this.experience = experience;
    this.expNextLevelFloor = expNextLevelFloor;
    this.creationDate = creationDate;

  }
}
