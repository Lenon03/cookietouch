import Message from "./Message";

export default class GuildInvitationByNameMessage extends Message {
  public name: string;

  constructor(name = "") {
    super();
    this.name = name;

  }
}
