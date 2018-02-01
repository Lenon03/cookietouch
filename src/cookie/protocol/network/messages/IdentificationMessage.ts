import Message from "./Message";

export default class IdentificationMessage extends Message {
  public credentials: number[];
  public lang: string;
  public serverId: number;
  public autoconnect: boolean;
  public useCertificate: boolean;
  public useLoginToken: boolean;
  public sessionOptionalSalt: number;

  constructor(lang = "", serverId = 0, autoconnect = false, useCertificate = false,
              useLoginToken = false, sessionOptionalSalt = 0, credentials: number[]) {
    super();
    this.credentials = credentials;
    this.lang = lang;
    this.serverId = serverId;
    this.autoconnect = autoconnect;
    this.useCertificate = useCertificate;
    this.useLoginToken = useLoginToken;
    this.sessionOptionalSalt = sessionOptionalSalt;
  }
}
