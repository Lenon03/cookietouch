import AllianceFactSheetInformations from "@/protocol/network/types/AllianceFactSheetInformations";
import AllianceListMessage from "@/protocol/network/messages/AllianceListMessage";

export default class AlliancePartialListMessage extends AllianceListMessage {
  constructor(alliances: AllianceFactSheetInformations[]) {
    super(alliances);

  }
}
