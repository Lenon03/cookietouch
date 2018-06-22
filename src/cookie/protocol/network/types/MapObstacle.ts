import Type from "@/protocol/network/types/Type";

export default class MapObstacle extends Type {
  public obstacleCellId: number;
  public state: number;

  constructor(obstacleCellId = 0, state = 0) {
    super();
    this.obstacleCellId = obstacleCellId;
    this.state = state;
  }
}
