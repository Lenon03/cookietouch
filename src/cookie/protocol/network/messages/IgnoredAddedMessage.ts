import Message from "@/protocol/network/messages/Message";
import IgnoredInformations from "@/protocol/network/types/IgnoredInformations";

export default class IgnoredAddedMessage extends Message {
  public ignoreAdded: IgnoredInformations;
  public session: boolean;

  constructor(ignoreAdded: IgnoredInformations, session = false) {
    super();
    this.ignoreAdded = ignoreAdded;
    this.session = session;

  }
}
