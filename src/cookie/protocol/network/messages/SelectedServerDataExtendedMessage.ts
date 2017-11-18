import SelectedServerDataMessage from "./SelectedServerDataMessage";
export default class SelectedServerDataExtendedMessage extends SelectedServerDataMessage {
public serverIds: number[];
constructor(serverId = 0, address = "", port = 0, canCreateNewCharacter = false, ticket = "", serverIds: number[]) {
super(serverId, address, port, canCreateNewCharacter, ticket );
this.serverIds = serverIds;

}
}
