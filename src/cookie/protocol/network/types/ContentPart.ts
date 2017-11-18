export default class ContentPart {

  public id: string;
  public state: number;

  constructor(id = "", state = 0) {
    this.id = id;
    this.state = state;
  }
}
