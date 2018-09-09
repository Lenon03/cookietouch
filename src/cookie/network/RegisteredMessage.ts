import Account from "@/account";
import Message from "@/protocol/network/messages/Message";

export default class RegisteredMessage {
  constructor(
    public name: string,
    public action: (account: Account, message: Message) => void
  ) {}
}
