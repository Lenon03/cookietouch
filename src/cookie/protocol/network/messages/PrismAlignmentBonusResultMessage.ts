import Message from "@/protocol/network/messages/Message";
import AlignmentBonusInformations from "@/protocol/network/types/AlignmentBonusInformations";

export default class PrismAlignmentBonusResultMessage extends Message {
  public alignmentBonus: AlignmentBonusInformations;

  constructor(alignmentBonus: AlignmentBonusInformations) {
    super();
    this.alignmentBonus = alignmentBonus;

  }
}
