import Account from "@/account";
import ICommand from "./Handlers/ICommand";

/**
 * Handle command string to call asigned command class & pass account.
 *
 * @export
 * @class CommandProcessor
 */
export default class CommandProcessor {
  private commandIdentifier: string;
  private handlers = {};

  constructor(commandIndentifier: string) {
    this.commandIdentifier = commandIndentifier;
  }

  /**
   * Assign a ICommand handler class to a specific command.
   *
   * @param {string} commandName
   * @param {ICommand<any>} commandHandler
   * @memberof CommandProcessor
   */
  public registerCommandHandler(commandName: string, commandHandler: ICommand<any>): void {
    this.handlers[commandName] = commandHandler;
  }

  /**
   * Extract command name to access his command Handler
   *
   * @param {string} command
   * @param {Account} account The game account on which the command will act.
   * @returns {boolean} Has the command executed successfully.
   * @memberof CommandProcessor
   */
  public processCommand(command: string, account: Account): boolean {
    if (!this.isCommandValid(command)) {
      return false;
    }

    const commandName = this.getCommandName(command);
    if (!this.handlers[commandName]) {
      return false;
    }

    this.handlers[commandName].handle(command, account);

    return true;
  }

  /**
   * Check if the command can be interpreted;
   *
   * @private
   * @param {string} command
   * @returns {boolean}
   * @memberof CommandProcessor
   */
  private isCommandValid(command: string): boolean {
    if (!command.startsWith(this.commandIdentifier)) {
      return false;
    }

    return true;
  }

  /**
   * Retrieve the command name from command string;
   *
   * @private
   * @param {string} command
   * @returns {string} The command name.
   * @memberof CommandProcessor
   */
  private getCommandName(command: string): string {
    return command.split(" ")[0].substring(1);
  }
}
