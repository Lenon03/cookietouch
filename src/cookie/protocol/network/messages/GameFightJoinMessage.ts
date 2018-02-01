import Message from "./Message";

export default class GameFightJoinMessage extends Message {
  public canBeCancelled: boolean;
  public canSayReady: boolean;
  public isSpectator: boolean;
  public isFightStarted: boolean;
  public timeMaxBeforeFightStart: number;
  public fightType: number;

  constructor(canBeCancelled = false, canSayReady = false, isSpectator = false,
              isFightStarted = false, timeMaxBeforeFightStart = 0, fightType = 0) {
    super();
    this.canBeCancelled = canBeCancelled;
    this.canSayReady = canSayReady;
    this.isSpectator = isSpectator;
    this.isFightStarted = isFightStarted;
    this.timeMaxBeforeFightStart = timeMaxBeforeFightStart;
    this.fightType = fightType;

  }
}
