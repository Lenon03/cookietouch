import LanguageManager from "@/configurations/language/LanguageManager";
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
    account.logger.logError(LanguageManager.trans("chatFrame"), ObjectErrorEnum[message.reason]);
  }

  private async HandleChatServerWithObjectMessage(account: Account, message: any) {
    // TODO: message.objects = objects in message
    this.HandleChatServerMessage(account, message);
  }

  private async HandleChatErrorMessage(account: Account, message: any) {
    if (typeof message.reason === "number") {
      this.account.logger.logError(LanguageManager.trans("chatFrame"), ChatErrorEnum[message.reason]);
    } else {
      this.account.logger.logDebug(LanguageManager.trans("chatFrame"), message.reason);
    }
  }

  private async HandleTextInformationMessage(account: Account, message: any) {
    let text: string = message.text;
    for (let i = 0; i < message.parameters.length; i++) {
      text = text.replace(`$%${i}`, message.parameters[i]);
    }

    switch (message.msgType) {
      case TextInformationTypeEnum.TEXT_INFORMATION_ERROR:
        account.logger.logError(LanguageManager.trans("chatFrame"), text);
        break;
      case TextInformationTypeEnum.TEXT_INFORMATION_MESSAGE:
        this.account.logger.logInfo(LanguageManager.trans("chatFrame"), text);
        break;
      default:
        this.account.logger.logDofus(LanguageManager.trans("chatFrame"), text);
        break;
    }
  }

  private async HandleSystemMessageDisplayMessage(account: Account, message: any) {
    this.account.logger.logError(LanguageManager.trans("chatFrame"), message.text);
  }

  private async HandleChatServerMessage(account: Account, message: any) {
    if (!this.isChannelEnabled(account, message.channel)) {
      return;
    }

    switch (message.channel) {
      case ChatChannelsMultiEnum.CHANNEL_ADMIN: {
        this.account.logger.log(LanguageManager.trans("admin"), `${message.senderName}: ${message.content}`, ChannelColors.ADMIN);
        break;
      }
      case ChatChannelsMultiEnum.CHANNEL_ALLIANCE: {
        this.account.logger.log(LanguageManager.trans("alliance"), `${message.senderName}: ${message.content}`, ChannelColors.NOOB);
        break;
      }
      case ChatChannelsMultiEnum.CHANNEL_GLOBAL: {
        this.account.logger.log(LanguageManager.trans("global"), `${message.senderName}: ${message.content}`, ChannelColors.GLOBAL);
        break;
      }
      case ChatChannelsMultiEnum.CHANNEL_GUILD: {
        this.account.logger.log(LanguageManager.trans("guild"), `${message.senderName}: ${message.content}`, ChannelColors.GUILD);
        break;
      }
      case ChatChannelsMultiEnum.CHANNEL_PARTY: {
        this.account.logger.log(LanguageManager.trans("party"), `${message.senderName}: ${message.content}`, ChannelColors.PARTY);
        break;
      }
      case ChatChannelsMultiEnum.CHANNEL_SALES: {
        this.account.logger.log(LanguageManager.trans("sales"), `${message.senderName}: ${message.content}`, ChannelColors.SALES);
        break;
      }
      case ChatChannelsMultiEnum.CHANNEL_SEEK: {
        this.account.logger.log(LanguageManager.trans("seek"), `${message.senderName}: ${message.content}`, ChannelColors.SEEK);
        break;
      }
      case ChatChannelsMultiEnum.CHANNEL_NOOB: {
        this.account.logger.log(LanguageManager.trans("noob"), `${message.senderName}: ${message.content}`, ChannelColors.NOOB);
        break;
      }
      case ChatChannelsMultiEnum.CHANNEL_TEAM: {
        this.account.logger.log(LanguageManager.trans("team"), `${message.senderName}: ${message.content}`, ChannelColors.TEAM);
        break;
      }
      case ChatChannelsMultiEnum.PSEUDO_CHANNEL_PRIVATE: {
        this.account.logger.log(LanguageManager.trans("messageFrom", message.senderName), message.content, ChannelColors.PRIVATE);
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
      this.account.logger.log(`à ${message.receiverName}`, message.content, ChannelColors.PRIVATE);
    }
  }

  private isChannelEnabled(account: Account, channel: ChatActivableChannelsEnum) {
    switch (channel) {
      case ChatActivableChannelsEnum.CHANNEL_GLOBAL: {
        return account.config.showGeneralMessages;
      }
      case ChatActivableChannelsEnum.CHANNEL_GUILD: {
        return account.config.showGuildMessages;
      }
      case ChatActivableChannelsEnum.CHANNEL_ALLIANCE: {
        return account.config.showAllianceMessages;
      }
      case ChatActivableChannelsEnum.CHANNEL_NOOB: {
        return account.config.showNoobMessages;
      }
      case ChatActivableChannelsEnum.CHANNEL_PARTY: {
        return account.config.showPartyMessages;
      }
      case ChatActivableChannelsEnum.CHANNEL_SEEK: {
        return account.config.showSeekMessages;
      }
      case ChatActivableChannelsEnum.CHANNEL_SALES: {
        return account.config.showSaleMessages;
      }
      default: {
        return true;
      }
    }
  }
}
