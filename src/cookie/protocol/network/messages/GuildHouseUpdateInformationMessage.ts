import Message from "@/protocol/network/messages/Message";
import HouseInformationsForGuild from "@/protocol/network/types/HouseInformationsForGuild";

export default class GuildHouseUpdateInformationMessage extends Message {
  public housesInformations: HouseInformationsForGuild;

  constructor(housesInformations: HouseInformationsForGuild) {
    super();
    this.housesInformations = housesInformations;

  }
}
