import AtlasPointsInformations from "@protocol/network/types/AtlasPointsInformations";
import Message from "./Message";

export default class AtlasPointInformationsMessage extends Message {
  public type: AtlasPointsInformations;

  constructor(type: AtlasPointsInformations) {
    super();
    this.type = type;

  }
}
