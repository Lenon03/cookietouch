import Message from "@/protocol/network/messages/Message";
import AllianceFactSheetInformations from "@/protocol/network/types/AllianceFactSheetInformations";
import GuildInAllianceInformations from "@/protocol/network/types/GuildInAllianceInformations";

export default class AllianceFactsMessage extends Message {
  public guilds: GuildInAllianceInformations[];
  public controlledSubareaIds: number[];
  public infos: AllianceFactSheetInformations;

  constructor(infos: AllianceFactSheetInformations,
              guilds: GuildInAllianceInformations[], controlledSubareaIds: number[]) {
    super();
    this.guilds = guilds;
    this.controlledSubareaIds = controlledSubareaIds;
    this.infos = infos;
  }
}
