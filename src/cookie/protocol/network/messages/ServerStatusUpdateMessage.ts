import Message from "@/protocol/network/messages/Message";
import GameServerInformations from "@/protocol/network/types/GameServerInformations";

export default class ServerStatusUpdateMessage extends Message {
  public server: GameServerInformations;

  constructor(server: GameServerInformations) {
    super();
    this.server = server;

  }
}
