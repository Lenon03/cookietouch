import MapObstacle from "@/protocol/network/types/MapObstacle";
import Message from "@/protocol/network/messages/Message";

export default class MapObstacleUpdateMessage extends Message {
  public obstacles: MapObstacle[];

  constructor(obstacles: MapObstacle[]) {
    super();
    this.obstacles = obstacles;

  }
}
