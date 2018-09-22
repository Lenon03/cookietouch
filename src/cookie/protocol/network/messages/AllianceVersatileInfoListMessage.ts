import Message from "@/protocol/network/messages/Message";
import AllianceVersatileInformations from "@/protocol/network/types/AllianceVersatileInformations";

export default class AllianceVersatileInfoListMessage extends Message {
  public alliances: AllianceVersatileInformations[];

  constructor(alliances: AllianceVersatileInformations[] = []) {
    super();
    this.alliances = alliances;
  }
}
