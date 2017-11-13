export default class Dispatcher {

  private prefix: string;
  private listeners: any;

  constructor() {
    this.prefix = "on_";
    this.listeners = {};
  }

  public register(eventName: string, callback: any, bind?: any) {
    const newEventName = this.prefix + eventName;
    if (typeof this.listeners[newEventName] === "undefined") {
      this.listeners[newEventName] = [];
    }
    this.listeners[newEventName].push([bind === null ? this : bind, callback]);
  }

  public emit(eventName: string, ...params: any[]) {
    const newEventName = this.prefix + eventName;
    if (typeof this.listeners[newEventName] !== "undefined") {
      for (let i = 0, l = this.listeners[newEventName].length; i < l; i++) {
        this.listeners[newEventName][i][1].call(this.listeners[newEventName][i][0], ...params);
      }
    }
  }
}
