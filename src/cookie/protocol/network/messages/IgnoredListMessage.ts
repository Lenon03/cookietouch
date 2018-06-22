import Message from "@/protocol/network/messages/Message";
import IgnoredInformations from "@/protocol/network/types/IgnoredInformations";

export default class IgnoredListMessage extends Message {

  public ignoredList: IgnoredInformations[];

  constructor(ignoredList: IgnoredInformations[]) {
    super();
    this.ignoredList = ignoredList;
  }
}
