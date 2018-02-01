import AbstractSocialGroupInfos from "@protocol/network/types/AbstractSocialGroupInfos";
import Message from "./Message";

export default class BasicWhoIsMessage extends Message {
  public socialGroups: AbstractSocialGroupInfos[];
  public self: boolean;
  public position: number;
  public accountNickname: string;
  public accountId: number;
  public playerName: string;
  public playerId: number;
  public areaId: number;
  public verbose: boolean;
  public playerState: number;

  constructor(self = false, position = -1, accountNickname = "", accountId = 0,
              playerName = "", playerId = 0, areaId = 0, verbose = false,
              playerState = 99, socialGroups: AbstractSocialGroupInfos[]) {
    super();
    this.socialGroups = socialGroups;
    this.self = self;
    this.position = position;
    this.accountNickname = accountNickname;
    this.accountId = accountId;
    this.playerName = playerName;
    this.playerId = playerId;
    this.areaId = areaId;
    this.verbose = verbose;
    this.playerState = playerState;

  }
}
