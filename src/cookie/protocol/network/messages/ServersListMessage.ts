import GameServerInformations from "@/protocol/network/types/GameServerInformations";
import Message from "@/protocol/network/messages/Message";

export default class ServersListMessage extends Message {
  public servers: GameServerInformations[];

  constructor(servers: GameServerInformations[]) {
    super();
    this.servers = servers;

  }
}
