import Account from "../Account";
import { ChatChannels } from "../protocol/enums/ChatChannels";

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
       case ChatChannels.CHANNEL_NOOB: {
         channel = "Débutant";
         break;
       }
       case ChatChannels.CHANNEL_TEAM: {
         channel = "Equipe";
         break;
       }
       case ChatChannels.CHANNEL_GLOBAL: {
         channel = "Général";
         break;
       }
       case ChatChannels.CHANNEL_GUILD: {
         channel = "Guilde";
         break;
       }
       case ChatChannels.CHANNEL_PARTY: {
         channel = "Groupe";
         break;
       }
       case ChatChannels.CHANNEL_SALES: {
         channel = "Commerce";
         break;
       }
       case ChatChannels.CHANNEL_SEEK: {
         channel = "Recrutement";
         break;
       }
       case ChatChannels.PSEUDO_CHANNEL_PRIVATE: {
         channel = "Privé";
         break;
       }
    }
    console.log("(" + channel + ") [" + data.senderName + "] : " + data.content);
  }
  public HandleChatServerWithObjectMessage(account: Account, data: any) {
    // data.objects = objects in message
    let channel;
    switch (data.channel) {
       case ChatChannels.CHANNEL_NOOB: {
         channel = "Débutant";
         break;
       }
       case ChatChannels.CHANNEL_TEAM: {
         channel = "Equipe";
         break;
       }
       case ChatChannels.CHANNEL_GLOBAL: {
         channel = "Général";
         break;
       }
       case ChatChannels.CHANNEL_GUILD: {
         channel = "Guilde";
         break;
       }
       case ChatChannels.CHANNEL_PARTY: {
         channel = "Groupe";
         break;
       }
       case ChatChannels.CHANNEL_SALES: {
         channel = "Commerce";
         break;
       }
       case ChatChannels.CHANNEL_SEEK: {
         channel = "Recrutement";
         break;
       }
       case ChatChannels.PSEUDO_CHANNEL_PRIVATE: {
         channel = "Privé";
         break;
       }
    }
    console.log("(" + channel + ") [" + data.senderName + "] : " + data.content);
  }
}
