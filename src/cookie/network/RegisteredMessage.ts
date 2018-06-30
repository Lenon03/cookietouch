import Account from "@/account";

export default class RegisteredMessage {
  constructor(
    public name: string,
    public action: (account: Account, message: any) => void
  ) {}
}
