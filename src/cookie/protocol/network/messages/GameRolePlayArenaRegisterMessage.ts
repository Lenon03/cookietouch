import Message from "@/protocol/network/messages/Message";

export default class GameRolePlayArenaRegisterMessage extends Message {
  public battleMode: number;

  constructor(battleMode = 3) {
    super();
    this.battleMode = battleMode;

  }
}
