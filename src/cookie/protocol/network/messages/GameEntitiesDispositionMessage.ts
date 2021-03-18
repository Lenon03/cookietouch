import Message from "@/protocol/network/messages/Message";
import IdentifiedEntityDispositionInformations from "@/protocol/network/types/IdentifiedEntityDispositionInformations";

export default class GameEntitiesDispositionMessage extends Message {
  public dispositions: IdentifiedEntityDispositionInformations[];

  constructor(dispositions: IdentifiedEntityDispositionInformations[]) {
    super();
    this.dispositions = dispositions;

  }
}
