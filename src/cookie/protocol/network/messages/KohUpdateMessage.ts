import Message from "@/protocol/network/messages/Message";
import AllianceInformations from "@/protocol/network/types/AllianceInformations";
import BasicAllianceInformations from "@/protocol/network/types/BasicAllianceInformations";

export default class KohUpdateMessage extends Message {
  public alliances: AllianceInformations[];
  public allianceNbMembers: number[];
  public allianceRoundWeigth: number[];
  public allianceMatchScore: number[];
  public allianceMapWinner: BasicAllianceInformations;
  public allianceMapWinnerScore: number;
  public allianceMapMyAllianceScore: number;
  public nextTickTime: number;

  constructor(allianceMapWinner: BasicAllianceInformations, allianceMapWinnerScore = 0,
              allianceMapMyAllianceScore = 0, nextTickTime = 0, alliances: AllianceInformations[],
              allianceNbMembers: number[], allianceRoundWeigth: number[], allianceMatchScore: number[]) {
    super();
    this.alliances = alliances;
    this.allianceNbMembers = allianceNbMembers;
    this.allianceRoundWeigth = allianceRoundWeigth;
    this.allianceMatchScore = allianceMatchScore;
    this.allianceMapWinner = allianceMapWinner;
    this.allianceMapWinnerScore = allianceMapWinnerScore;
    this.allianceMapMyAllianceScore = allianceMapMyAllianceScore;
    this.nextTickTime = nextTickTime;

  }
}
