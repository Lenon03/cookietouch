import Account from "@/account";
import LanguageManager from "@/configurations/language/LanguageManager";
import { ChannelColors } from "@/core/logger/ChannelColors";
import Frames, { IFrame } from "@/frames";
import { ChatActivableChannelsEnum } from "@/protocol/enums/ChatActivableChannelsEnum";
import { ChatChannelsMultiEnum } from "@/protocol/enums/ChatChannelsMultiEnum";
import { ChatErrorEnum } from "@/protocol/enums/ChatErrorEnum";
import { ObjectErrorEnum } from "@/protocol/enums/ObjectErrorEnum";
import { TextInformationTypeEnum } from "@/protocol/enums/TextInformationTypeEnum";
import ChatServerWithObjectMessage from "@/protocol/network/messages/ChatServerWithObjectMessage";

export default class ChatFrame implements IFrame {
  public register() {
    Frames.dispatcher.register(
      "ObjectErrorMessage",
      this.HandleObjectErrorMessage,
      this
    );
    Frames.dispatcher.register(
      "ChatServerWithObjectMessage",
      this.HandleChatServerWithObjectMessage,
      this
    );
    Frames.dispatcher.register(
      "ChatErrorMessage",
      this.HandleChatErrorMessage,
      this
    );
    Frames.dispatcher.register(
      "ChatServerMessage",
      this.HandleChatServerMessage,
      this
    );
    Frames.dispatcher.register(
      "SystemMessageDisplayMessage",
      this.HandleSystemMessageDisplayMessage,
      this
    );
    Frames.dispatcher.register(
      "TextInformationMessage",
      this.HandleTextInformationMessage,
      this
    );
    Frames.dispatcher.register(
      "ChatServerCopyMessage",
      this.HandleChatServerCopyMessage,
      this
    );
  }

  private async HandleObjectErrorMessage(account: Account, message: any) {
    account.logger.logError(
      LanguageManager.trans("chatFrame"),
      ObjectErrorEnum[message.reason]
    );
  }

  private async HandleChatServerWithObjectMessage(
    account: Account,
    message: ChatServerWithObjectMessage
  ) {
    // TODO: message.objects = objects in message
    this.HandleChatServerMessage(account, message);
  }

  private async HandleChatErrorMessage(account: Account, message: any) {
    if (typeof message.reason === "number") {
      account.logger.logError(
        LanguageManager.trans("chatFrame"),
        ChatErrorEnum[message.reason]
      );
    } else {
      account.logger.logDebug(
        LanguageManager.trans("chatFrame"),
        message.reason
      );
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
        account.logger.logInfo(LanguageManager.trans("chatFrame"), text);
        break;
      default:
        account.logger.logDofus(LanguageManager.trans("chatFrame"), text);
        break;
    }
  }

  private async HandleSystemMessageDisplayMessage(
    account: Account,
    message: any
  ) {
    account.logger.logError(LanguageManager.trans("chatFrame"), message.text);
  }

  private async HandleChatServerMessage(account: Account, message: any) {
    if (!this.isChannelEnabled(account, message.channel)) {
      return;
    }

    switch (message.channel) {
      case ChatChannelsMultiEnum.CHANNEL_ADMIN: {
        account.logger.log(
          LanguageManager.trans("admin"),
          `${message.senderName}: ${message.content}`,
          ChannelColors.ADMIN
        );
        break;
      }
      case ChatChannelsMultiEnum.CHANNEL_ALLIANCE: {
        account.logger.log(
          LanguageManager.trans("alliance"),
          `${message.senderName}: ${message.content}`,
          ChannelColors.NOOB
        );
        break;
      }
      case ChatChannelsMultiEnum.CHANNEL_GLOBAL: {
        account.logger.log(
          LanguageManager.trans("global"),
          `${message.senderName}: ${message.content}`,
          ChannelColors.GLOBAL
        );
        break;
      }
      case ChatChannelsMultiEnum.CHANNEL_GUILD: {
        account.logger.log(
          LanguageManager.trans("guild"),
          `${message.senderName}: ${message.content}`,
          ChannelColors.GUILD
        );
        break;
      }
      case ChatChannelsMultiEnum.CHANNEL_PARTY: {
        account.logger.log(
          LanguageManager.trans("party"),
          `${message.senderName}: ${message.content}`,
          ChannelColors.PARTY
        );
        break;
      }
      case ChatChannelsMultiEnum.CHANNEL_SALES: {
        account.logger.log(
          LanguageManager.trans("sales"),
          `${message.senderName}: ${message.content}`,
          ChannelColors.SALES
        );
        break;
      }
      case ChatChannelsMultiEnum.CHANNEL_SEEK: {
        account.logger.log(
          LanguageManager.trans("seek"),
          `${message.senderName}: ${message.content}`,
          ChannelColors.SEEK
        );
        break;
      }
      case ChatChannelsMultiEnum.CHANNEL_NOOB: {
        account.logger.log(
          LanguageManager.trans("noob"),
          `${message.senderName}: ${message.content}`,
          ChannelColors.NOOB
        );
        break;
      }
      case ChatChannelsMultiEnum.CHANNEL_TEAM: {
        account.logger.log(
          LanguageManager.trans("team"),
          `${message.senderName}: ${message.content}`,
          ChannelColors.TEAM
        );
        break;
      }
      case ChatChannelsMultiEnum.PSEUDO_CHANNEL_PRIVATE: {
        account.logger.log(
          LanguageManager.trans("messageFrom", message.senderName),
          message.content,
          ChannelColors.PRIVATE
        );
        break;
      }
      case ChatChannelsMultiEnum.CHANNEL_ADS: {
        account.logger.log(
          message.senderName,
          message.content,
          ChannelColors.ADS
        );
        break;
      }
    }
  }

  private async HandleChatServerCopyMessage(account: Account, message: any) {
    if (message.channel === ChatActivableChannelsEnum.PSEUDO_CHANNEL_PRIVATE) {
      account.logger.log(
        `à ${message.receiverName}`,
        message.content,
        ChannelColors.PRIVATE
      );
    }
  }

  private isChannelEnabled(
    account: Account,
    channel: ChatActivableChannelsEnum
  ) {
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
