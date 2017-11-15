import Account from "../Account";
import { ChatChannelsMultiEnum } from "../protocol/enums/ChatChannelsMultiEnum";

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
    this.account.dispatcher.register("ChatServerWithObjectMessage", this.HandleChatServerWithObjectMessage, this);
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
    let channel;
    switch (data.channel) {
       case ChatChannelsMultiEnum.CHANNEL_NOOB: {
         channel = "Débutant";
         break;
       }
       case ChatChannelsMultiEnum.CHANNEL_TEAM: {
         channel = "Equipe";
         break;
       }
       case ChatChannelsMultiEnum.CHANNEL_GLOBAL: {
         channel = "Général";
         break;
       }
       case ChatChannelsMultiEnum.CHANNEL_GUILD: {
         channel = "Guilde";
         break;
       }
       case ChatChannelsMultiEnum.CHANNEL_PARTY: {
         channel = "Groupe";
         break;
       }
       case ChatChannelsMultiEnum.CHANNEL_SALES: {
         channel = "Commerce";
         break;
       }
       case ChatChannelsMultiEnum.CHANNEL_SEEK: {
         channel = "Recrutement";
         break;
       }
       case ChatChannelsMultiEnum.PSEUDO_CHANNEL_PRIVATE: {
         channel = "Privé";
         break;
       }
    }
    console.log("(" + channel + ") [" + data.senderName + "] : " + data.content);
  }
  public HandleChatServerWithObjectMessage(account: Account, data: any) {
    // TODO: data.objects = objects in message
    this.HandleChatServerMessage(account, data);
  }
}
