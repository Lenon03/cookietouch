import Type from "./Type";

export default class ContentPart extends Type {

  public id: string;
  public state: number;

  constructor(id = "", state = 0) {
    super();
    this.id = id;
    this.state = state;
  }
}
