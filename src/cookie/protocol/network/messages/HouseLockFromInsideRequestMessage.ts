import LockableChangeCodeMessage from "./LockableChangeCodeMessage";

export default class HouseLockFromInsideRequestMessage extends LockableChangeCodeMessage {
  constructor(code = "") {
    super(code);

  }
}
