import IgnoredInformations from "@/protocol/network/types/IgnoredInformations";
import Message from "@/protocol/network/messages/Message";

export default class IgnoredListMessage extends Message {

  public ignoredList: IgnoredInformations[];

  constructor(ignoredList: IgnoredInformations[]) {
    super();
    this.ignoredList = ignoredList;
  }
}
