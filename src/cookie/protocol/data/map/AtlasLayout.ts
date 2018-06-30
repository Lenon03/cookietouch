export class GraphicSizes {
  public sx: number;
  public sy: number;
  public sw: number;
  public sh: number;
}

export class AtlasLayout {
  public width: number;
  public height: number;
  public graphicsPositions = new Map<number, GraphicSizes>();
}
