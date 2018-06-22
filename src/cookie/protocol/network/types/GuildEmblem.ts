import Type from "@/protocol/network/types/Type";

export default class GuildEmblem extends Type {

  public symbolShape: number;
  public symbolColor: number;
  public backgroundShape: number;
  public backgroundColor: number;

  constructor(symbolShape = 0, symbolColor = 0, backgroundShape = 0, backgroundColor = 0) {
    super();
    this.symbolShape = symbolShape;
    this.symbolColor = symbolColor;
    this.backgroundShape = backgroundShape;
    this.backgroundColor = backgroundColor;
  }
}
