import DisplayNumericalValueMessage from "@/protocol/network/messages/DisplayNumericalValueMessage";

export default class DisplayNumericalValueWithAgeBonusMessage extends DisplayNumericalValueMessage {
  public valueOfBonus: number;

  constructor(entityId = 0, value = 0, type = 0, valueOfBonus = 0) {
    super(entityId, value, type);
    this.valueOfBonus = valueOfBonus;

  }
}
