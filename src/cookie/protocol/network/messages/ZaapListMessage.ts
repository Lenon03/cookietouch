import TeleportDestinationsListMessage from "./TeleportDestinationsListMessage";

export default class ZaapListMessage extends TeleportDestinationsListMessage {
  public spawnMapId: number;

  constructor(teleporterType = 0, spawnMapId = 0, mapIds: number[], subAreaIds: number[], costs: number[], destTeleporterType: number[]) {
    super(teleporterType, mapIds, subAreaIds, costs, destTeleporterType);
    this.spawnMapId = spawnMapId;

  }
}
