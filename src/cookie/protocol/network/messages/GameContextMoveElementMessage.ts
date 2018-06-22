import Message from "@/protocol/network/messages/Message";
import EntityMovementInformations from "@/protocol/network/types/EntityMovementInformations";

export default class GameContextMoveElementMessage extends Message {
  public movement: EntityMovementInformations;

  constructor(movement: EntityMovementInformations) {
    super();
    this.movement = movement;

  }
}
