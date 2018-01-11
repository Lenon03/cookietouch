import Type from "./Type";

export default class ActorRestrictionsInformations extends Type {
  public cantBeAggressed: boolean;
  public cantBeChallenged: boolean;
  public cantTrade: boolean;
  public cantBeAttackedByMutant: boolean;
  public cantRun: boolean;
  public forceSlowWalk: boolean;
  public cantMinimize: boolean;
  public cantMove: boolean;
  public cantAggress: boolean;
  public cantChallenge: boolean;
  public cantExchange: boolean;
  public cantAttack: boolean;
  public cantChat: boolean;
  public cantBeMerchant: boolean;
  public cantUseObject: boolean;
  public cantUseTaxCollector: boolean;
  public cantUseInteractive: boolean;
  public cantSpeakToNpc: boolean;
  public cantChangeZone: boolean;
  public cantAttackMonster: boolean;
  public cantWalk8Directions: boolean;

  constructor(cantBeAggressed = false, cantBeChallenged = false, cantTrade = false,
              cantBeAttackedByMutant = false, cantRun = false, forceSlowWalk = false,
              cantMinimize = false, cantMove = false, cantAggress = false,
              cantChallenge = false, cantExchange = false, cantAttack = false,
              cantChat = false, cantBeMerchant = false, cantUseObject = false,
              cantUseTaxCollector = false, cantUseInteractive = false, cantSpeakToNpc = false,
              cantChangeZone = false, cantAttackMonster = false, cantWalk8Directions = false) {
    super();
    this.cantBeAggressed = cantBeAggressed;
    this.cantBeChallenged = cantBeChallenged;
    this.cantTrade = cantTrade;
    this.cantBeAttackedByMutant = cantBeAttackedByMutant;
    this.cantRun = cantRun;
    this.forceSlowWalk = forceSlowWalk;
    this.cantMinimize = cantMinimize;
    this.cantMove = cantMove;
    this.cantAggress = cantAggress;
    this.cantChallenge = cantChallenge;
    this.cantExchange = cantExchange;
    this.cantAttack = cantAttack;
    this.cantChat = cantChat;
    this.cantBeMerchant = cantBeMerchant;
    this.cantUseObject = cantUseObject;
    this.cantUseTaxCollector = cantUseTaxCollector;
    this.cantUseInteractive = cantUseInteractive;
    this.cantSpeakToNpc = cantSpeakToNpc;
    this.cantChangeZone = cantChangeZone;
    this.cantAttackMonster = cantAttackMonster;
    this.cantWalk8Directions = cantWalk8Directions;
  }
}
