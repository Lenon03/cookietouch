import ExchangeStartedMessage from "@/protocol/network/messages/ExchangeStartedMessage";

export default class ExchangeStartedWithPodsMessage extends ExchangeStartedMessage {
  public firstCharacterId: number;
  public firstCharacterCurrentWeight: number;
  public firstCharacterMaxWeight: number;
  public secondCharacterId: number;
  public secondCharacterCurrentWeight: number;
  public secondCharacterMaxWeight: number;

  constructor(exchangeType = 0, firstCharacterId = 0, firstCharacterCurrentWeight = 0,
              firstCharacterMaxWeight = 0, secondCharacterId = 0, secondCharacterCurrentWeight = 0,
              secondCharacterMaxWeight = 0) {
    super(exchangeType);
    this.firstCharacterId = firstCharacterId;
    this.firstCharacterCurrentWeight = firstCharacterCurrentWeight;
    this.firstCharacterMaxWeight = firstCharacterMaxWeight;
    this.secondCharacterId = secondCharacterId;
    this.secondCharacterCurrentWeight = secondCharacterCurrentWeight;
    this.secondCharacterMaxWeight = secondCharacterMaxWeight;

  }
}
