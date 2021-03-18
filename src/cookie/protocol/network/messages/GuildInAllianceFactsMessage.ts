import GuildFactsMessage from "@/protocol/network/messages/GuildFactsMessage";
import BasicNamedAllianceInformations from "@/protocol/network/types/BasicNamedAllianceInformations";
import CharacterMinimalInformations from "@/protocol/network/types/CharacterMinimalInformations";
import GuildFactSheetInformations from "@/protocol/network/types/GuildFactSheetInformations";

export default class GuildInAllianceFactsMessage extends GuildFactsMessage {
  public allianceInfos: BasicNamedAllianceInformations;

  constructor(infos: GuildFactSheetInformations, creationDate = 0, nbTaxCollectors = 0,
              enabled = false, allianceInfos: BasicNamedAllianceInformations, members: CharacterMinimalInformations[]) {
    super(infos, creationDate, nbTaxCollectors, enabled, members);
    this.allianceInfos = allianceInfos;

  }
}
