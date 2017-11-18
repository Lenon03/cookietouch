import GameServerInformations from "@protocol/network/types/GameServerInformations";
import Message from "./Message";
export default class ServersListMessage extends Message {
public servers: GameServerInformations[];
constructor(servers: GameServerInformations[]) {
super();
this.servers = servers;

}
}
