import Account from "../Account";
import { MapChangeDirections } from "../game/managers/movements/MapChangeDirections";
import { ChatChannelsMultiEnum } from "../protocol/enums/ChatChannelsMultiEnum";

export default class BasicFrame {

  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.register();
  }

  private register() {
    this.account.dispatcher.register("ChatServerMessage", this.HandleChatServerMessage, this);
    this.account.dispatcher.register("SystemMessageDisplayMessage", this.HandleSystemMessageDisplayMessage, this);
    this.account.dispatcher.register("TextInformationMessage", this.HandleTextInformationMessage, this);
    this.account.dispatcher.register("ChatServerWithObjectMessage", this.HandleChatServerWithObjectMessage, this);
  }

  private async HandleTextInformationMessage(account: Account, data: any) {
    console.log("[MESSAGE] " + data.text);
  }

  private async HandleSystemMessageDisplayMessage(account: Account, data: any) {
    console.log("[IMPORTANT] " + data.text);
  }

  private async HandleChatServerMessage(account: Account, data: any) {
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

    const res = account.game.managers.movements.changeMap(MapChangeDirections.Right);
    console.log("Movement Results: ", res);
  }

  private async HandleChatServerWithObjectMessage(account: Account, data: any) {
    // TODO: data.objects = objects in message
    this.HandleChatServerMessage(account, data);
  }
}
