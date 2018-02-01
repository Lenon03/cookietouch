import CharacterMinimalInformations from "@protocol/network/types/CharacterMinimalInformations";
import GuildFactSheetInformations from "@protocol/network/types/GuildFactSheetInformations";
import Message from "./Message";

export default class GuildFactsMessage extends Message {
  public members: CharacterMinimalInformations[];
  public infos: GuildFactSheetInformations;
  public creationDate: number;
  public nbTaxCollectors: number;
  public enabled: boolean;

  constructor(infos: GuildFactSheetInformations, creationDate = 0, nbTaxCollectors = 0, enabled = false, members: CharacterMinimalInformations[]) {
    super();
    this.members = members;
    this.infos = infos;
    this.creationDate = creationDate;
    this.nbTaxCollectors = nbTaxCollectors;
    this.enabled = enabled;

  }
}
