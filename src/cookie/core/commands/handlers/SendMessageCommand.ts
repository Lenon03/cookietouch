import Account from "@/account";
import Command from "@/core/commands/handlers/Command";
import ICommand from "@/core/commands/handlers/ICommand";

/**
 * Send an ingame message (second arg) to player (first arg).
 * Example: /sendMessage Player092 Hey ! :)
 *
 * @export
 * @class SendMessageCommand
 * @implements {ICommand<ISendMessage>}
 */
export default class SendMessageCommand extends Command<ISendMessage>
  implements ICommand<ISendMessage> {
  constructor() {
    super();
    this.args = ["receiver", "message"];
  }

  public handle(command: string, account: Account): ISendMessage {
    const args = this.parseArgs(command);
    account.game.chat.sendMessageTo(args.message, args.receiver);

    return args;
  }
}

export interface ISendMessage {
  receiver: string;
  message: string;
}
