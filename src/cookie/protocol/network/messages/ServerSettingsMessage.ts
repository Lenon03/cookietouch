import Message from "./Message";

export default class ServerSettingsMessage extends Message {
  public lang: string;
  public community: number;
  public gameType: number;

  constructor(lang = "", community = 0, gameType = 0) {
    super();
    this.lang = lang;
    this.community = community;
    this.gameType = gameType;

  }
}
