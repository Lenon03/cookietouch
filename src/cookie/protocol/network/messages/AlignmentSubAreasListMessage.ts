import Message from "./Message";

export default class AlignmentSubAreasListMessage extends Message {
  public angelsSubAreas: number[];
  public evilsSubAreas: number[];

  constructor(angelsSubAreas: number[], evilsSubAreas: number[]) {
    super();
    this.angelsSubAreas = angelsSubAreas;
    this.evilsSubAreas = evilsSubAreas;

  }
}
