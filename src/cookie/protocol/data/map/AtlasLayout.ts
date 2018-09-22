export class GraphicSizes {
  public sx: number = 0;
  public sy: number = 0;
  public sw: number = 0;
  public sh: number = 0;
}

export class AtlasLayout {
  public width: number = 0;
  public height: number = 0;
  public graphicsPositions = new Map<number, GraphicSizes>();
}
