import MountInformationsForPaddock from "./MountInformationsForPaddock";
import PaddockInformations from "./PaddockInformations";

export default class PaddockContentInformations extends PaddockInformations {
  public mountsInformations: MountInformationsForPaddock[];
  public paddockId: number;
  public worldX: number;
  public worldY: number;
  public mapId: number;
  public subAreaId: number;
  public abandonned: boolean;

  constructor(maxOutdoorMount = 0, maxItems = 0, paddockId = 0, worldX = 0,
              worldY = 0, mapId = 0, subAreaId = 0, abandonned = false,
              mountsInformations: MountInformationsForPaddock[] = null) {
    super(maxOutdoorMount, maxItems);
    this.mountsInformations = mountsInformations;
    this.paddockId = paddockId;
    this.worldX = worldX;
    this.worldY = worldY;
    this.mapId = mapId;
    this.subAreaId = subAreaId;
    this.abandonned = abandonned;

  }
}
