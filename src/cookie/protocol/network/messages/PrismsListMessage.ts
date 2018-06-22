import PrismSubareaEmptyInfo from "@/protocol/network/types/PrismSubareaEmptyInfo";
import Message from "@/protocol/network/messages/Message";

export default class PrismsListMessage extends Message {
  public prisms: PrismSubareaEmptyInfo[];

  constructor(prisms: PrismSubareaEmptyInfo[]) {
    super();
    this.prisms = prisms;

  }
}
