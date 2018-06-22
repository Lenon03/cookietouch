import Type from "@/protocol/network/types/Type";

export default class ActorOrientation extends Type {

  public id: number;
  public direction: number;

  constructor(id = 0, direction = 1) {
    super();
    this.id = id;
    this.direction = direction;
  }
}
