import Message from "@/protocol/network/messages/Message";

export default class AuthenticationTicketMessage extends Message {
  public lang: string;
  public ticket: string;

  constructor(lang = "", ticket = "") {
    super();
    this.lang = lang;
    this.ticket = ticket;

  }
}
