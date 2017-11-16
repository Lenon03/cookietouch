export default class GuildEmblem {

  public symbolshape: number;
  public symbolcolor: number;
  public backgroundshape: number;
  public backgroundcolor: number;

  constructor(symbolshape = 0, symbolcolor = 0, backgroundshape = 0, backgroundcolor = 0) {
    this.symbolshape = symbolshape;
    this.symbolcolor = symbolcolor;
    this.backgroundshape = backgroundshape;
    this.backgroundcolor = backgroundcolor;
  }
}
