import GameFightTurnStartMessage from "./GameFightTurnStartMessage";

export default class GameFightTurnResumeMessage extends GameFightTurnStartMessage {
  constructor(id = 0, waitTime = 0) {
    super(id, waitTime);

  }
}
