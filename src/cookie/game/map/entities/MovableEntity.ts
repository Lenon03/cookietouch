import GameMapMovementMessage from "@/protocol/network/messages/GameMapMovementMessage";

export default class MovableEntity {
  public cellId: number = 0;

  public UpdateGameMapMovementMessage(message: GameMapMovementMessage) {
    this.cellId = message.keyMovements[message.keyMovements.length - 1];
  }
}
