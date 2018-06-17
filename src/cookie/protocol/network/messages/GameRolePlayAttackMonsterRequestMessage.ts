import Message from "./Message";

export default class GameRolePlayAttackMonsterRequestMessage extends Message {

  public monsterGroupId: number;

  constructor(monsterGroupId: number = 0) {
    super();
    this.monsterGroupId = monsterGroupId;
  }
}
