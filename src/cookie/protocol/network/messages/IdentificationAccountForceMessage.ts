import IdentificationMessage from "./IdentificationMessage";

export default class IdentificationAccountForceMessage extends IdentificationMessage {
  public forcedAccountLogin: string;

  constructor(lang = "", serverId = 0, autoconnect = false, useCertificate = false,
              useLoginToken = false, sessionOptionalSalt = 0, forcedAccountLogin = "", credentials: number[]) {
    super(lang, serverId, autoconnect, useCertificate, useLoginToken, sessionOptionalSalt, credentials);
    this.forcedAccountLogin = forcedAccountLogin;

  }
}
