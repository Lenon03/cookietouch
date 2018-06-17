import Message from "./Message";

export default class ConsoleCommandsListMessage extends Message {
  public aliases: string[];
  public args: string[];
  public descriptions: string[];

  constructor(aliases: string[], args: string[], descriptions: string[]) {
    super();
    this.aliases = aliases;
    this.args = args;
    this.descriptions = descriptions;

  }
}
