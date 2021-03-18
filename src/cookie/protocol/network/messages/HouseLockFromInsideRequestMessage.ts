import LockableChangeCodeMessage from "@/protocol/network/messages/LockableChangeCodeMessage";

export default class HouseLockFromInsideRequestMessage extends LockableChangeCodeMessage {
  constructor(code = "") {
    super(code);

  }
}
