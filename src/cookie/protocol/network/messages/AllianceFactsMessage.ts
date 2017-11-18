import AllianceFactSheetInformations from "@protocol/network/types/AllianceFactSheetInformations";
import GuildInAllianceInformations from "@protocol/network/types/GuildInAllianceInformations";
import Message from "./Message";

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
