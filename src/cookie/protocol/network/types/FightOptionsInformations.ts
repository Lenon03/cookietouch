export default class FightOptionsInformations {

  public issecret: boolean;
  public isrestrictedtopartyonly: boolean;
  public isclosed: boolean;
  public isaskingforhelp: boolean;

  constructor(issecret = false, isrestrictedtopartyonly = false, isclosed = false, isaskingforhelp = false) {
    this.issecret = issecret;
    this.isrestrictedtopartyonly = isrestrictedtopartyonly;
    this.isclosed = isclosed;
    this.isaskingforhelp = isaskingforhelp;
  }
}
