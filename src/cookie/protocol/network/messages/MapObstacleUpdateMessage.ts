import Message from "@/protocol/network/messages/Message";
import MapObstacle from "@/protocol/network/types/MapObstacle";

export default class MapObstacleUpdateMessage extends Message {
  public obstacles: MapObstacle[];

  constructor(obstacles: MapObstacle[]) {
    super();
    this.obstacles = obstacles;

  }
}
