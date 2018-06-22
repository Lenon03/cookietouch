import EntityMovementInformations from "@/protocol/network/types/EntityMovementInformations";
import Message from "@/protocol/network/messages/Message";

export default class GameContextMoveMultipleElementsMessage extends Message {
  public movements: EntityMovementInformations[];

  constructor(movements: EntityMovementInformations[]) {
    super();
    this.movements = movements;

  }
}
