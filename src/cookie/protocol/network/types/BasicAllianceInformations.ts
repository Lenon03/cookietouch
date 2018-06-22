import Type from "@/protocol/network/types/Type";

export default class BasicAllianceInformations extends Type {

  public allianceId: number;
  public allianceTag: string;

  constructor(allianceId = 0, allianceTag = "") {
    super();
    this.allianceId = allianceId;
    this.allianceTag = allianceTag;
  }
}
