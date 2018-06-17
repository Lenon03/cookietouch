import Message from "./Message";

export default class AlignmentSubAreaUpdateMessage extends Message {
  public subAreaId: number;
  public side: number;
  public quiet: boolean;

  constructor(subAreaId = 0, side = 0, quiet = false) {
    super();
    this.subAreaId = subAreaId;
    this.side = side;
    this.quiet = quiet;

  }
}
