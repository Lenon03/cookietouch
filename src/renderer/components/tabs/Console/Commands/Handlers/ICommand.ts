import Account from "@/account";

export default interface ICommand<ICommandProps> {
  handle(command: string, account?: Account): ICommandProps;
}
