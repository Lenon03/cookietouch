import Message from "./Message";
export default class TeleportDestinationsListMessage extends Message {
public mapIds: number[];
public subAreaIds: number[];
public costs: number[];
public destTeleporterType: number[];
public teleporterType: number;
constructor(teleporterType = 0, mapIds: number[], subAreaIds: number[], costs: number[], destTeleporterType: number[]) {
super();
this.mapIds = mapIds;
this.subAreaIds = subAreaIds;
this.costs = costs;
this.destTeleporterType = destTeleporterType;
this.teleporterType = teleporterType;

}
}
