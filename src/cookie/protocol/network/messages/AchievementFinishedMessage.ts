import Message from "./Message";
export default class AchievementFinishedMessage extends Message {
  public id: number;
  public finishedlevel: number;
  constructor(id = 0, finishedlevel = 0) {
    super();
    this.id = id;
    this.finishedlevel = finishedlevel;

  }
}
