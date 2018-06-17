import Account from "@/account";
import FloodConfiguration from "@/extensions/flood/FloodConfiguration";
import PlayerEntry from "@/game/map/entities/PlayerEntry";
import { ChatChannelsMultiEnum } from "@/protocol/enums/ChatChannelsMultiEnum";
import LiteEvent from "@/utils/LiteEvent";
import { getRandomInt } from "@/utils/Random";
import TimerWrapper from "@/utils/TimerWrapper";

export default class FloodExtension {
  public config: FloodConfiguration;
  public running: boolean = false;

  private account: Account;
  private smileys = [
    ":p",
    ":D",
    ":)",
    ":]",
    ":')",
    ":'D",
    ":3",
    "^^",
    ":'p",
    "x)",
    ";)"
  ];
  private seekChannelTimer: TimerWrapper;
  private salesChannelTimer: TimerWrapper;
  private generalChannelTimer: TimerWrapper;
  private readonly onRunningChanged = new LiteEvent<void>();

  constructor(account: Account) {
    this.account = account;

    this.config = new FloodConfiguration(account);

    this.seekChannelTimer = new TimerWrapper(
      this.SeekChannel_Callback,
      this,
      this.config.seekChannelInterval * 1000
    );
    this.salesChannelTimer = new TimerWrapper(
      this.SalesChannel_Callback,
      this,
      this.config.seekChannelInterval * 1000
    );
    this.generalChannelTimer = new TimerWrapper(
      this.GeneralChannel_Callback,
      this,
      this.config.seekChannelInterval * 1000
    );

    this.account.game.map.PlayerJoined.on(this.map_PlayerJoined);
    this.account.game.map.PlayerLeft.on(this.map_PlayerLeft);
  }

  public get RunningChanged() {
    return this.onRunningChanged.expose();
  }

  public start() {
    if (this.running) {
      return;
    }
    this.seekChannelTimer.start(true);
    this.salesChannelTimer.start(true);
    this.generalChannelTimer.start(true);
    this.running = true;
    this.onRunningChanged.trigger();
  }

  public stop() {
    if (!this.running) {
      return;
    }
    this.seekChannelTimer.stop();
    this.salesChannelTimer.stop();
    this.generalChannelTimer.stop();
    this.running = false;
    this.onRunningChanged.trigger();
  }

  private async SeekChannel_Callback() {
    if (!this.running) {
      return;
    }
    const seekChannelSentences = this.getSentences(
      ChatChannelsMultiEnum.CHANNEL_SEEK
    );
    if (seekChannelSentences.Count() > 0) {
      const sentence = seekChannelSentences.ElementAt(
        getRandomInt(0, seekChannelSentences.Count() - 1)
      );
      await this.account.game.chat.sendMessage(
        this.setAttributes(sentence.content),
        sentence.channel
      );
    }
  }

  private async SalesChannel_Callback() {
    if (!this.running) {
      return;
    }
    const salesChannelSentences = this.getSentences(
      ChatChannelsMultiEnum.CHANNEL_SALES
    );
    if (salesChannelSentences.Count() > 0) {
      const sentence = salesChannelSentences.ElementAt(
        getRandomInt(0, salesChannelSentences.Count() - 1)
      );
      await this.account.game.chat.sendMessage(
        this.setAttributes(sentence.content),
        sentence.channel
      );
    }
  }

  private async GeneralChannel_Callback() {
    if (!this.running) {
      return;
    }
    const generalChannelSentences = this.getSentences(
      ChatChannelsMultiEnum.CHANNEL_GLOBAL
    );
    if (generalChannelSentences.Count() > 0) {
      const sentence = generalChannelSentences.ElementAt(
        getRandomInt(0, generalChannelSentences.Count() - 1)
      );
      await this.account.game.chat.sendMessage(
        this.setAttributes(sentence.content),
        sentence.channel
      );
    }
  }

  private map_PlayerJoined = async (player: PlayerEntry) => {
    if (!this.running) {
      return;
    }
    const privateChannelSentences = this.getPrivateSentences(true, false);
    if (privateChannelSentences.Count() > 0) {
      const sentence = privateChannelSentences.ElementAt(
        getRandomInt(0, privateChannelSentences.Count() - 1)
      );
      await this.account.game.chat.sendMessageTo(
        this.setAttributes(sentence.content, player),
        player.name
      );
    }
  };

  private map_PlayerLeft = async (player: PlayerEntry) => {
    if (!this.running) {
      return;
    }
    const privateChannelSentences = this.getPrivateSentences(false, true);
    if (privateChannelSentences.Count() > 0) {
      const sentence = privateChannelSentences.ElementAt(
        getRandomInt(0, privateChannelSentences.Count() - 1)
      );
      await this.account.game.chat.sendMessageTo(
        this.setAttributes(sentence.content, player),
        player.name
      );
    }
  };

  private setAttributes(content: string, player: PlayerEntry = null): string {
    content = content.replace("%nbr%", this.getRandomNumber());
    content = content.replace("%smiley%", this.getRandomSmiley());
    if (player) {
      content = content.replace("%name%", player.name);
      content = content.replace("%level%", player.level.toString());
    }
    return content;
  }

  private getRandomNumber(): string {
    return `${getRandomInt(0, 10)}${getRandomInt(0, 10)}${getRandomInt(0, 10)}`;
  }

  private getRandomSmiley(): string {
    return this.smileys[getRandomInt(0, this.smileys.length - 1)];
  }

  private getSentences(channel: ChatChannelsMultiEnum) {
    return this.config.sentences.Where(s => s.channel === channel);
  }

  private getPrivateSentences(onPlayerJoined: boolean, onPlayerLeft: boolean) {
    return this.config.sentences.Where(s => {
      if (onPlayerJoined && !s.onPlayerJoined) {
        return false;
      }
      if (onPlayerLeft && !s.onPlayerLeft) {
        return false;
      }
      return true;
    });
  }
}
