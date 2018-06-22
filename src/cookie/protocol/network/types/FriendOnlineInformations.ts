import BasicGuildInformations from "@/protocol/network/types/BasicGuildInformations";
import FriendInformations from "@/protocol/network/types/FriendInformations";
import PlayerStatus from "@/protocol/network/types/PlayerStatus";

export default class FriendOnlineInformations extends FriendInformations {
  public playerId: number;
  public playerName: string;
  public level: number;
  public alignmentSide: number;
  public breed: number;
  public sex: boolean;
  public guildInfo: BasicGuildInformations;
  public moodSmileyId: number;
  public status: PlayerStatus;

  constructor(accountId = 0, accountName = "", playerState = 99, lastConnection = 0,
              achievementPoints = 0, playerId = 0, playerName = "", level = 0,
              alignmentSide = 0, breed = 0, sex = false, guildInfo: BasicGuildInformations, moodSmileyId = 0,
              status: PlayerStatus) {
    super(accountId, accountName, playerState, lastConnection, achievementPoints);
    this.playerId = playerId;
    this.playerName = playerName;
    this.level = level;
    this.alignmentSide = alignmentSide;
    this.breed = breed;
    this.sex = sex;
    this.guildInfo = guildInfo;
    this.moodSmileyId = moodSmileyId;
    this.status = status;

  }
}
