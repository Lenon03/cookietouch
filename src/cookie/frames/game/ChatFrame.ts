import Account from "@account";
import { ChannelColors } from "@logger/ChannelColors";
import { LogType } from "@logger/LogType";
import { ChatActivableChannelsEnum } from "@protocol/enums/ChatActivableChannelsEnum";
import { ChatChannelsMultiEnum } from "@protocol/enums/ChatChannelsMultiEnum";
import { ChatErrorEnum } from "@protocol/enums/ChatErrorEnum";
import { ObjectErrorEnum } from "@protocol/enums/ObjectErrorEnum";
import { TextInformationTypeEnum } from "@protocol/enums/TextInformationTypeEnum";

export default class ChatFrame {

  private account: Account;

  constructor(account: Account) {
    this.account = account;
    this.register();
  }

  private register() {
    this.account.dispatcher.register("ObjectErrorMessage", this.HandleObjectErrorMessage, this);
    this.account.dispatcher.register("ChatServerWithObjectMessage", this.HandleChatServerWithObjectMessage, this);
    this.account.dispatcher.register("ChatErrorMessage", this.HandleChatErrorMessage, this);
    this.account.dispatcher.register("ChatServerMessage", this.HandleChatServerMessage, this);
    this.account.dispatcher.register("SystemMessageDisplayMessage", this.HandleSystemMessageDisplayMessage, this);
    this.account.dispatcher.register("TextInformationMessage", this.HandleTextInformationMessage, this);
    this.account.dispatcher.register("ChatServerCopyMessage", this.HandleChatServerCopyMessage, this);
  }

  private async HandleObjectErrorMessage(account: Account, message: any) {
    account.logger.logError("", ObjectErrorEnum[message.reason]);
  }

  private async HandleChatServerWithObjectMessage(account: Account, message: any) {
    // TODO: message.objects = objects in message
    this.HandleChatServerMessage(account, message);
  }

  private async HandleChatErrorMessage(account: Account, message: any) {
    if (typeof message.reason === "number") {
      this.account.logger.logError("ChatFrame", ChatErrorEnum[message.reason]);
    } else {
      this.account.logger.logDebug("ChatFrame", message.reason);
    }
  }

  private async HandleTextInformationMessage(account: Account, message: any) {
    let text: string = message.text;
    for (let i = 0; i < message.parameters.length; i++) {
      text = text.replace(`$%${i}`, message.parameters[i]);
    }

    switch (message.msgType) {
      case TextInformationTypeEnum.TEXT_INFORMATION_ERROR:
        account.logger.logError("", text);
        break;
      case TextInformationTypeEnum.TEXT_INFORMATION_MESSAGE:
        this.account.logger.logInfo("", text);
        break;
      default:
        this.account.logger.logDofus("", text);
        break;
    }
  }

  private async HandleSystemMessageDisplayMessage(account: Account, message: any) {
    this.account.logger.logError("ChatFrame", message.text);
  }

  private async HandleChatServerMessage(account: Account, message: any) {
    switch (message.channel) {
      case ChatChannelsMultiEnum.CHANNEL_ADMIN: {
        this.account.logger.log("Admin", `${message.senderName}: ${message.content}`, ChannelColors.ADMIN);
        break;
      }
      case ChatChannelsMultiEnum.CHANNEL_ALLIANCE: {
        this.account.logger.log("Alliance", `${message.senderName}: ${message.content}`, ChannelColors.NOOB);
        break;
      }
      case ChatChannelsMultiEnum.CHANNEL_GLOBAL: {
        this.account.logger.log("Général", `${message.senderName}: ${message.content}`, ChannelColors.GLOBAL);
        break;
      }
      case ChatChannelsMultiEnum.CHANNEL_GUILD: {
        this.account.logger.log("Guilde", `${message.senderName}: ${message.content}`, ChannelColors.GUILD);
        break;
      }
      case ChatChannelsMultiEnum.CHANNEL_PARTY: {
        this.account.logger.log("Groupe", `${message.senderName}: ${message.content}`, ChannelColors.PARTY);
        break;
      }
      case ChatChannelsMultiEnum.CHANNEL_SALES: {
        this.account.logger.log("Commerce", `${message.senderName}: ${message.content}`, ChannelColors.SALES);
        break;
      }
      case ChatChannelsMultiEnum.CHANNEL_SEEK: {
        this.account.logger.log("Recrutement", `${message.senderName}: ${message.content}`, ChannelColors.SEEK);
        break;
      }
      case ChatChannelsMultiEnum.CHANNEL_NOOB: {
        this.account.logger.log("Débutant", `${message.senderName}: ${message.content}`, ChannelColors.NOOB);
        break;
      }
      case ChatChannelsMultiEnum.CHANNEL_TEAM: {
        this.account.logger.log("Equipe", `${message.senderName}: ${message.content}`, ChannelColors.TEAM);
        break;
      }
      case ChatChannelsMultiEnum.PSEUDO_CHANNEL_PRIVATE: {
        this.account.logger.log(`de ${message.senderName}`, message.content, ChannelColors.PRIVATE);
        break;
      }
      case ChatChannelsMultiEnum.CHANNEL_ADS: {
        this.account.logger.log(message.senderName, message.content, ChannelColors.ADS);
        break;
      }
    }
  }

  private async HandleChatServerCopyMessage(account: Account, message: any) {
    if (message.channel === ChatActivableChannelsEnum.PSEUDO_CHANNEL_PRIVATE) {
      this.account.logger.log(`de ${message.receiverName}`, message.content, ChannelColors.PRIVATE);
    }
  }
}
