export default class MapObstacle {
  public obstacleCellId: number;
  public state: number;
  constructor(obstacleCellId = 0, state = 0) {

    this.obstacleCellId = obstacleCellId;
    this.state = state;

  }
}
