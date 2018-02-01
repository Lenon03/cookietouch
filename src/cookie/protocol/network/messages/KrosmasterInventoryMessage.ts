import KrosmasterFigure from "@protocol/network/types/KrosmasterFigure";
import Message from "./Message";

export default class KrosmasterInventoryMessage extends Message {
  public figures: KrosmasterFigure[];

  constructor(figures: KrosmasterFigure[]) {
    super();
    this.figures = figures;

  }
}
