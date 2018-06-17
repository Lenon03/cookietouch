import Message from "./Message";

export default class EntityTalkMessage extends Message {
  public parameters: string[];
  public entityId: number;
  public textId: number;

  constructor(entityId = 0, textId = 0, parameters: string[]) {
    super();
    this.parameters = parameters;
    this.entityId = entityId;
    this.textId = textId;

  }
}
