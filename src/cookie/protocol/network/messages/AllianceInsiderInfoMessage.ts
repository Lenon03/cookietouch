import AllianceFactSheetInformations from "@protocol/network/types/AllianceFactSheetInformations";
import GuildInsiderFactSheetInformations from "@protocol/network/types/GuildInsiderFactSheetInformations";
import PrismSubareaEmptyInfo from "@protocol/network/types/PrismSubareaEmptyInfo";
import Message from "./Message";

export default class AllianceInsiderInfoMessage extends Message {
  public guilds: GuildInsiderFactSheetInformations[];
  public prisms: PrismSubareaEmptyInfo[];
  public allianceInfos: AllianceFactSheetInformations;
  constructor(allianceInfos: AllianceFactSheetInformations,
              guilds: GuildInsiderFactSheetInformations[], prisms: PrismSubareaEmptyInfo[]) {
    super();
    this.guilds = guilds;
    this.prisms = prisms;
    this.allianceInfos = allianceInfos;

  }
}
