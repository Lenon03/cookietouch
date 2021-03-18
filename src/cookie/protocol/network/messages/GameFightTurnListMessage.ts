import Message from "@/protocol/network/messages/Message";

export default class GameFightTurnListMessage extends Message {
  public ids: number[];
  public deadsIds: number[];

  constructor(ids: number[], deadsIds: number[]) {
    super();
    this.ids = ids;
    this.deadsIds = deadsIds;

  }
}
