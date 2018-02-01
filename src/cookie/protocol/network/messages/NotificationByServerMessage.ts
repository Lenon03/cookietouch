import Message from "./Message";

export default class NotificationByServerMessage extends Message {
  public parameters: string[];
  public id: number;
  public forceOpen: boolean;

  constructor(id = 0, forceOpen = false, parameters: string[]) {
    super();
    this.parameters = parameters;
    this.id = id;
    this.forceOpen = forceOpen;

  }
}
