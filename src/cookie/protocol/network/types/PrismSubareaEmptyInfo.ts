import Type from "@/protocol/network/types/Type";

export default class PrismSubareaEmptyInfo extends Type {
  public subAreaId: number;
  public allianceId: number;

  constructor(subAreaId = 0, allianceId = 0) {
    super();
    this.subAreaId = subAreaId;
    this.allianceId = allianceId;
  }
}
