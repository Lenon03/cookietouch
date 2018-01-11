import Type from "./Type";

export default class FightOptionsInformations extends Type {

  public issecret: boolean;
  public isrestrictedtopartyonly: boolean;
  public isclosed: boolean;
  public isaskingforhelp: boolean;

  constructor(issecret = false, isrestrictedtopartyonly = false, isclosed = false, isaskingforhelp = false) {
    super();
    this.issecret = issecret;
    this.isrestrictedtopartyonly = isrestrictedtopartyonly;
    this.isclosed = isclosed;
    this.isaskingforhelp = isaskingforhelp;
  }
}
