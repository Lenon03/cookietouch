export default class MovableEntity {
  public cellId: number;

  public update(message: any) {
    this.cellId = message.keyMovements[message.keyMovements - 1];
  }
}
