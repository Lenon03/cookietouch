import Message from "./Message";

export default class InteractiveUsedMessage extends Message {
  public entityId: number;
  public elemId: number;
  public skillId: number;
  public duration: number;

  constructor(entityId = 0, elemId = 0, skillId = 0, duration = 0) {
    super();
    this.entityId = entityId;
    this.elemId = elemId;
    this.skillId = skillId;
    this.duration = duration;

  }
}
