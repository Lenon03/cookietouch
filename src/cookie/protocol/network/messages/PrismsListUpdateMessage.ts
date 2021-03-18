import PrismsListMessage from "@/protocol/network/messages/PrismsListMessage";
import PrismSubareaEmptyInfo from "@/protocol/network/types/PrismSubareaEmptyInfo";

export default class PrismsListUpdateMessage extends PrismsListMessage {
  constructor(prisms: PrismSubareaEmptyInfo[]) {
    super(prisms);

  }
}
