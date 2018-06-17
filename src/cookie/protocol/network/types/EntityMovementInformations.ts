import Type from "./Type";

export default class EntityMovementInformations extends Type {

  public steps: number[];
  public id: number;

  constructor(id = 0, steps: number[]) {
    super();
    this.steps = steps;
    this.id = id;
  }
}
