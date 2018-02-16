export default interface ICommand<ICommandProps> {
  handle: (command: string) => ICommandProps;
}
