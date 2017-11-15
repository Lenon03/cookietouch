import InteractiveElementEntry from "./InteractiveElementEntry";

export default class ElementInCellEntry {
  public element: InteractiveElementEntry;
  public cellId: number;

  constructor(element: InteractiveElementEntry, cellId: number) {
    this.element = element;
    this.cellId = cellId;
  }
}
