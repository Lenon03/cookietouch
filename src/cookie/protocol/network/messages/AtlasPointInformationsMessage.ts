import Message from "@/protocol/network/messages/Message";
import AtlasPointsInformations from "@/protocol/network/types/AtlasPointsInformations";

export default class AtlasPointInformationsMessage extends Message {
  public type: AtlasPointsInformations;

  constructor(type = new AtlasPointsInformations()) {
    super();
    this.type = type;
  }
}
