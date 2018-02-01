import EntityMovementInformations from "@protocol/network/types/EntityMovementInformations";
import Message from "./Message";

export default class GameContextMoveMultipleElementsMessage extends Message {
  public movements: EntityMovementInformations[];

  constructor(movements: EntityMovementInformations[]) {
    super();
    this.movements = movements;

  }
}
