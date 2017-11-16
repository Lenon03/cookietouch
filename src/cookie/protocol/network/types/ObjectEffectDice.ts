import ObjectEffect from "./ObjectEffect";

export default class ObjectEffectDice extends ObjectEffect {

  public dicenum: number;
  public diceside: number;
  public diceconst: number;

  constructor(actionid = 0, dicenum = 0, diceside = 0, diceconst = 0) {
    super(actionid);
    this.dicenum = dicenum;
    this.diceside = diceside;
    this.diceconst = diceconst;
  }
}
