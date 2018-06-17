export default class Command<ICommandProps> {
  protected args: string[];

  /**
   * Assign each word in the command string to command args.
   * Example:
   *  Args: [arg1, arg2, arg3]
   *  CommandString: "str1 str2 str3 str4"
   *  // As the arg1, str2 & arg2, str2 indexes are equal, they'll be maped together ({ arg1: str1, ... }),
   *  // and as arg3 is the last argument, he'll take the rest of the command string ({ ..., arg3: "str3 str4" })
   *
   * @protected
   * @param {string} command
   * @returns {ICommandProps} The parsed command.
   * @memberof Command
   */
  protected parseArgs(command: string): ICommandProps {
    const parsedArgs = {};
    const commandPayload = command.split(" ").map(word => word.trim());

    delete commandPayload[0];

    this.args.forEach((arg, index) => {
      if (index + 1 === this.args.length) {
        parsedArgs[arg] = commandPayload
          .join(" ")
          .substring(
            commandPayload.join(" ").lastIndexOf(commandPayload[index + 1])
          );
      } else {
        parsedArgs[arg] = commandPayload[index + 1];
      }
    });

    return parsedArgs as ICommandProps;
  }
}
