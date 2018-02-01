import Message from "./Message";

export default class AuthenticationTicketMessage extends Message {
  public lang: string;
  public ticket: string;

  constructor(lang = "", ticket = "") {
    super();
    this.lang = lang;
    this.ticket = ticket;

  }
}
