import PaddockInformations from "@protocol/network/types/PaddockInformations";
import Message from "./Message";

export default class PaddockPropertiesMessage extends Message {
  public properties: PaddockInformations;

  constructor(properties: PaddockInformations) {
    super();
    this.properties = properties;

  }
}
