import Type from "./Type";

export default class PlayerStatus extends Type {

  public statusId: number;

  constructor(statusId = 1) {
    super();
    this.statusId = statusId;
  }
}
