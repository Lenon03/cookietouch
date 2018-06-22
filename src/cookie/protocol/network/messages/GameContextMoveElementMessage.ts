import EntityMovementInformations from "@/protocol/network/types/EntityMovementInformations";
import Message from "@/protocol/network/messages/Message";

export default class GameContextMoveElementMessage extends Message {
  public movement: EntityMovementInformations;

  constructor(movement: EntityMovementInformations) {
    super();
    this.movement = movement;

  }
}
