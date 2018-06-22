import PrismInformation from "@/protocol/network/types/PrismInformation";

export default class AllianceInsiderPrismInformation extends PrismInformation {

  public lastTimesLotModificationDate: number;
  public lastTimesLotModificationAuthorGuildId: number;
  public lastTimesLotModificationAuthorId: number;
  public lastTimesLotModificationAuthorName: string;
  public hasTeleporterModule: boolean;

  constructor(typeid = 0, state = 1, nextvulnerabilitydate = 0, placementdate = 0,
              rewardtokencount = 0, lastTimesLotModificationDate = 0, lastTimesLotModificationAuthorGuildId = 0,
              lastTimesLotModificationAuthorId = 0, lastTimesLotModificationAuthorName = "",
              hasTeleporterModule = false) {
    super(typeid, state, nextvulnerabilitydate, placementdate, rewardtokencount);
    this.lastTimesLotModificationDate = lastTimesLotModificationDate;
    this.lastTimesLotModificationAuthorGuildId = lastTimesLotModificationAuthorGuildId;
    this.lastTimesLotModificationAuthorId = lastTimesLotModificationAuthorId;
    this.lastTimesLotModificationAuthorName = lastTimesLotModificationAuthorName;
    this.hasTeleporterModule = hasTeleporterModule;
  }
}
