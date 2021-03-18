import GameContextRemoveElementMessage from "@/protocol/network/messages/GameContextRemoveElementMessage";

export default class GameContextRemoveElementWithEventMessage extends GameContextRemoveElementMessage {
  public elementEventId: number;

  constructor(id = 0, elementEventId = 0) {
    super(id);
    this.elementEventId = elementEventId;

  }
}
