import LockableStateUpdateAbstractMessage from "./LockableStateUpdateAbstractMessage";

export default class LockableStateUpdateStorageMessage extends LockableStateUpdateAbstractMessage {
  public mapId: number;
  public elementId: number;

  constructor(locked = false, mapId = 0, elementId = 0) {
    super(locked);
    this.mapId = mapId;
    this.elementId = elementId;

  }
}
