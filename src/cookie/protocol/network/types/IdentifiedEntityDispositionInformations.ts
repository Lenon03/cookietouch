import EntityDispositionInformations from "./EntityDispositionInformations";

export default class IdentifiedEntityDispositionInformations extends EntityDispositionInformations {
  public id: number;

  constructor(cellId = 0, direction = 1, id = 0) {
    super(cellId, direction);
    this.id = id;

  }
}
