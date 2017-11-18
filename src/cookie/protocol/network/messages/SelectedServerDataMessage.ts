import Message from "./Message";
export default class SelectedServerDataMessage extends Message {
  public serverId: number;
  public address: string;
  public port: number;
  public canCreateNewCharacter: boolean;
  public ticket: string;
  public _access: string;

  constructor(serverId = 0, address = "", port = 0, canCreateNewCharacter = false, ticket = "") {
    super();
    this.serverId = serverId;
    this.address = address;
    this.port = port;
    this.canCreateNewCharacter = canCreateNewCharacter;
    this.ticket = ticket;

  }
}
