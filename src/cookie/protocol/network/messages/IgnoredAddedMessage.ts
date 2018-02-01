import IgnoredInformations from "@protocol/network/types/IgnoredInformations";
import Message from "./Message";

export default class IgnoredAddedMessage extends Message {
  public ignoreAdded: IgnoredInformations;
  public session: boolean;

  constructor(ignoreAdded: IgnoredInformations, session = false) {
    super();
    this.ignoreAdded = ignoreAdded;
    this.session = session;

  }
}
