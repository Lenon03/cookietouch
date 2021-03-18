import Message from "@/protocol/network/messages/Message";
import KrosmasterFigure from "@/protocol/network/types/KrosmasterFigure";

export default class KrosmasterInventoryMessage extends Message {
  public figures: KrosmasterFigure[];

  constructor(figures: KrosmasterFigure[]) {
    super();
    this.figures = figures;

  }
}
