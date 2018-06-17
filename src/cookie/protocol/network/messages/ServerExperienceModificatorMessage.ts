import Message from "./Message";

export default class ServerExperienceModificatorMessage extends Message {
  public experiencePercent: number;

  constructor(experiencePercent = 0) {
    super();
    this.experiencePercent = experiencePercent;

  }
}
