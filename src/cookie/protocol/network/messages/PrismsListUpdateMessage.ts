import PrismSubareaEmptyInfo from "@protocol/network/types/PrismSubareaEmptyInfo";
import PrismsListMessage from "./PrismsListMessage";

export default class PrismsListUpdateMessage extends PrismsListMessage {
  constructor(prisms: PrismSubareaEmptyInfo[]) {
    super(prisms);

  }
}
