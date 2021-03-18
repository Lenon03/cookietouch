import Message from "@/protocol/network/messages/Message";
import GameServerInformations from "@/protocol/network/types/GameServerInformations";

export default class ServersListMessage extends Message {
  public servers: GameServerInformations[];

  constructor(servers: GameServerInformations[]) {
    super();
    this.servers = servers;

  }
}
