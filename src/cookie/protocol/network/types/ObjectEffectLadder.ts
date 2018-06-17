import ObjectEffectCreature from "./ObjectEffectCreature";

export default class ObjectEffectLadder extends ObjectEffectCreature {

  public monstercount: number;

  constructor(actionid = 0, monsterfamilyid = 0, monstercount = 0) {
    super(actionid);
    this.monstercount = monstercount;
  }
}
