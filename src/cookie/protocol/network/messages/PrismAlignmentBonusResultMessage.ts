import AlignmentBonusInformations from "@protocol/network/types/AlignmentBonusInformations";
import Message from "./Message";

export default class PrismAlignmentBonusResultMessage extends Message {
  public alignmentBonus: AlignmentBonusInformations;

  constructor(alignmentBonus: AlignmentBonusInformations) {
    super();
    this.alignmentBonus = alignmentBonus;

  }
}
