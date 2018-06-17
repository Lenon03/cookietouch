import HouseInformations from "@protocol/network/types/HouseInformations";
import Message from "./Message";

export default class HousePropertiesMessage extends Message {
  public properties: HouseInformations;

  constructor(properties: HouseInformations) {
    super();
    this.properties = properties;

  }
}
