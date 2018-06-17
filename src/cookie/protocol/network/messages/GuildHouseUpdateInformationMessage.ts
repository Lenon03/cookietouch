import HouseInformationsForGuild from "@protocol/network/types/HouseInformationsForGuild";
import Message from "./Message";

export default class GuildHouseUpdateInformationMessage extends Message {
  public housesInformations: HouseInformationsForGuild;

  constructor(housesInformations: HouseInformationsForGuild) {
    super();
    this.housesInformations = housesInformations;

  }
}
