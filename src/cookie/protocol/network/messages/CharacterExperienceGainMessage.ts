import Message from "./Message";

export default class CharacterExperienceGainMessage extends Message {
  public experienceCharacter: number;
  public experienceMount: number;
  public experienceGuild: number;
  public experienceIncarnation: number;

  constructor(experienceCharacter = 0, experienceMount = 0, experienceGuild = 0, experienceIncarnation = 0) {
    super();
    this.experienceCharacter = experienceCharacter;
    this.experienceMount = experienceMount;
    this.experienceGuild = experienceGuild;
    this.experienceIncarnation = experienceIncarnation;

  }
}
