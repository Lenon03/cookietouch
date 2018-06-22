import Message from "@/protocol/network/messages/Message";

export default class ExchangeMountSterilizeFromPaddockMessage extends Message {
  public name: string;
  public worldX: number;
  public worldY: number;
  public sterilizator: string;

  constructor(name = "", worldX = 0, worldY = 0, sterilizator = "") {
    super();
    this.name = name;
    this.worldX = worldX;
    this.worldY = worldY;
    this.sterilizator = sterilizator;

  }
}
