import AllianceVersatileInformations from "@/protocol/network/types/AllianceVersatileInformations";
import Message from "@/protocol/network/messages/Message";

export default class AllianceVersatileInfoListMessage extends Message {
  public alliances: AllianceVersatileInformations[];

  constructor(alliances: AllianceVersatileInformations[]) {
    super();
    this.alliances = alliances;

  }
}
