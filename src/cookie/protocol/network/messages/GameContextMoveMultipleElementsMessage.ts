import Message from "@/protocol/network/messages/Message";
import EntityMovementInformations from "@/protocol/network/types/EntityMovementInformations";

export default class GameContextMoveMultipleElementsMessage extends Message {
  public movements: EntityMovementInformations[];

  constructor(movements: EntityMovementInformations[]) {
    super();
    this.movements = movements;

  }
}
