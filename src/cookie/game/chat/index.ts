import Account from "@account";
import { ChatActivableChannelsEnum } from "@protocol/enums/ChatActivableChannelsEnum";

export default class Chat {
  private account: Account;

  constructor(account: Account) {
    this.account = account;
  }

  public async sendMessageFree(message: string,
                               channel: ChatActivableChannelsEnum = ChatActivableChannelsEnum.CHANNEL_GLOBAL) {
    if (message.length > 0) {
      await this.account.network.sendMessageFree("ChatClientMultiMessage", {
        channel,
        content: message,
      });
    }
  }

  public async sendMessageFreeTo(message: string, receiver: string) {
    if (message.length > 0 && receiver.length > 0) {
      await this.account.network.sendMessageFree("ChatClientPrivateMessage", {
        content: message,
        receiver,
      });
    }
  }
}
