import Message from "./Message";

export default class TitlesAndOrnamentsListMessage extends Message {
  public titles: number[];
  public ornaments: number[];
  public activeTitle: number;
  public activeOrnament: number;

  constructor(activeTitle = 0, activeOrnament = 0, titles: number[], ornaments: number[]) {
    super();
    this.titles = titles;
    this.ornaments = ornaments;
    this.activeTitle = activeTitle;
    this.activeOrnament = activeOrnament;

  }
}
