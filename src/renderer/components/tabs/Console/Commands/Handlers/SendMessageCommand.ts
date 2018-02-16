import Command from "./Command";
import ICommand from "./ICommand";

/**
 * Send an ingame message (second arg) to player (first arg).
 * Example: /sendMessage Player092 Hey ! :)
 *
 * @export
 * @class SendMessageCommand
 * @implements {ICommand<ISendMessage>}
 */
export default class SendMessageCommand extends Command<ISendMessage> implements ICommand<ISendMessage> {
  constructor() {
    super();
    this.args = ["receiver", "message"];
  }

  public handle(command: string): ISendMessage {
    const args = this.parseArgs(command);
    alert(`Sending ${args.message} to ${args.receiver}`);

    return args;
  }
}

export interface ISendMessage {
  receiver: string;
  message: string;
}
