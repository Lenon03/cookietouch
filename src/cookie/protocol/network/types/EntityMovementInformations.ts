export default class EntityMovementInformations {

  public steps: number[];
  public id: number;

  constructor(id = 0, steps: number[]) {
    this.steps = steps;
    this.id = id;
  }
}
