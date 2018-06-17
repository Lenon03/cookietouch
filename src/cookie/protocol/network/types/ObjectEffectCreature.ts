import ObjectEffect from "./ObjectEffect";

export default class ObjectEffectCreature extends ObjectEffect {

  public monsterFamilyId: number;

  constructor(actionid = 0, monsterFamilyId = 0) {
    super(actionid);
    this.monsterFamilyId = monsterFamilyId;
  }
}
