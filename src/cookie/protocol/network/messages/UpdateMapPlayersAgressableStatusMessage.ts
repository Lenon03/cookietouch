import Message from "@/protocol/network/messages/Message";

export default class UpdateMapPlayersAgressableStatusMessage extends Message {
  public playerIds: number[];
  public enable: number[];

  constructor(playerIds: number[], enable: number[]) {
    super();
    this.playerIds = playerIds;
    this.enable = enable;

  }
}
