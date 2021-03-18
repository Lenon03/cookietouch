import Message from "@/protocol/network/messages/Message";
import PrismSubareaEmptyInfo from "@/protocol/network/types/PrismSubareaEmptyInfo";

export default class PrismsListMessage extends Message {
  public prisms: PrismSubareaEmptyInfo[];

  constructor(prisms: PrismSubareaEmptyInfo[]) {
    super();
    this.prisms = prisms;

  }
}
