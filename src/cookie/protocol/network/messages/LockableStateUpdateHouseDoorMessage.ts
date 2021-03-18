import LockableStateUpdateAbstractMessage from "@/protocol/network/messages/LockableStateUpdateAbstractMessage";

export default class LockableStateUpdateHouseDoorMessage extends LockableStateUpdateAbstractMessage {
  public houseId: number;

  constructor(locked = false, houseId = 0) {
    super(locked);
    this.houseId = houseId;

  }
}
