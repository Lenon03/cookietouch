import Message from "@/protocol/network/messages/Message";
import PaddockInformations from "@/protocol/network/types/PaddockInformations";

export default class PaddockPropertiesMessage extends Message {
  public properties: PaddockInformations;

  constructor(properties: PaddockInformations) {
    super();
    this.properties = properties;

  }
}
