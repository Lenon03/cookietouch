import GameContextRemoveMultipleElementsMessage from "./GameContextRemoveMultipleElementsMessage";

export default class GameContextRemoveMultipleElementsWithEventsMessage
  extends GameContextRemoveMultipleElementsMessage {
  public elementEventIds: number[];

  constructor(id: number[], elementEventIds: number[]) {
    super(id);
    this.elementEventIds = elementEventIds;

  }
}
