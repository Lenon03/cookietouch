import Account from "../Account";

export default class BasicFrame {

  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.register();
  }

  public register() {
    this.account.dispatcher.register("ChatServerMessage", this.HandleChatServerMessage, this);
    this.account.dispatcher.register("SystemMessageDisplayMessage", this.HandleSystemMessageDisplayMessage, this);
    this.account.dispatcher.register("TextInformationMessage", this.HandleTextInformationMessage, this);
  }

  public HandleTextInformationMessage(account: Account, data: any) {
    // EventHub.$emit("logs", {
    //   action: "CHAT",
    //   data: "[MESSAGE] " + data.text,
    // });
    console.log("[MESSAGE] " + data.text);
  }

  public HandleSystemMessageDisplayMessage(account: Account, data: any) {
    // EventHub.$emit("logs", {
    //   action: "CHAT",
    //   data: "[IMPORTANT] " + data.text,
    // });
    console.log("[IMPORTANT] " + data.text);
  }

  public HandleChatServerMessage(account: Account, data: any) {
    // EventHub.$emit("logs", {
    //   action: "CHAT",
    //   data: "[" + data.senderName + "] " + data.content,
    // });
    console.log("[" + data.senderName + "] " + data.content);
  }
}
