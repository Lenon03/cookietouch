import Message from "@/protocol/network/messages/Message";
import AllianceFactSheetInformations from "@/protocol/network/types/AllianceFactSheetInformations";

export default class AllianceListMessage extends Message {
  public alliances: AllianceFactSheetInformations[];

  constructor(alliances: AllianceFactSheetInformations[] = null) {
    super();
    this.alliances = alliances;

  }
}
