export default class MovableEntity {
  public cellId: number;

  public UpdateGameMapMovementMessage(message: any) {
    this.cellId = message.keyMovements[message.keyMovements.length - 1];
  }
}
