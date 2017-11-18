import GuildVersatileInformations from "@protocol/network/types/GuildVersatileInformations";
import Message from "./Message";
export default class GuildVersatileInfoListMessage extends Message {
public guilds: GuildVersatileInformations[];
constructor(guilds: GuildVersatileInformations[]) {
super();
this.guilds = guilds;

}
}
