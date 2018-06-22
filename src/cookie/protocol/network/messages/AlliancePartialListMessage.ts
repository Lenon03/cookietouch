import AllianceListMessage from "@/protocol/network/messages/AllianceListMessage";
import AllianceFactSheetInformations from "@/protocol/network/types/AllianceFactSheetInformations";

export default class AlliancePartialListMessage extends AllianceListMessage {
  constructor(alliances: AllianceFactSheetInformations[]) {
    super(alliances);

  }
}
