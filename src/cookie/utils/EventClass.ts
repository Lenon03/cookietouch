const multiChannelSep = /(?:,|\s)+/g;
const channelSep = /:+/g;
const channelsSymbol = Symbol("channels");

export default class EventClass {
  private [channelsSymbol]: any;

  public trigger(event: string, data: any) {
    const channels = this._getChannels(event);

    for (const channel of channels) {
      const namespaces = this._getNameSpaces(channel);
      for (const namespace of namespaces) {
        if (!this[channelsSymbol][namespace]) {
          continue;
        }

        for (const callback of this[channelsSymbol][namespace]) {
          callback.call(this, data);
        }
      }
    }
  }

  public on(event: string, callback: () => void) {
    const channels = this._getChannels(event);

    for (const channel of channels) {
      if (!this[channelsSymbol][channel]) {
        this[channelsSymbol][channel] = [];
      }

      this[channelsSymbol][channel].push(callback);
    }
  }

  public off(event: string, callback: () => void) {
    const channels = this._getChannels(event);

    for (const channel of channels) {
      if (!this[channelsSymbol][channel]) {
        return;
      }

      const index = this[channelsSymbol][channel].indexOf(callback);

      if (index > -1) {
        this[channelsSymbol][channel].splice(index, 1);
      }
    }
  }

  public once(event: string, callback: () => void) {
    const offCallback = () => {
      this.off(event, callback);
      this.off(event, offCallback);
    };

    this.on(event, callback);
    this.on(event, offCallback);
  }

  private _getChannels(channelString: string) {
    return channelString.trim().split(multiChannelSep);
  }

  private _getNameSpaces(channel: string) {
    const namespaces = [];
    const splittedChannels = channel.trim().split(channelSep);

    for (let i = splittedChannels.length; i >= 1; i--) {
      namespaces.push(splittedChannels.slice(0, i).join(":"));
    }

    return namespaces;
  }
}
