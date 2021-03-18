export default class TimerWrapper {
  public enabled: boolean = false;

  private timer: NodeJS.Timer | undefined;
  private interval: number;
  private callback: () => void;
  private object: any;

  constructor(timerCallback: () => void, object: any, interval: number) {
    this.interval = interval;
    this.callback = timerCallback;
    this.object = object;
  }

  public start(now = false) {
    if (this.enabled) {
      return;
    }
    this.enabled = true;
    if (now) {
      this.callback.bind(this.object)();
    }
    this.timer = global.setInterval(
      this.callback.bind(this.object),
      this.interval
    );
  }

  public stop() {
    if (!this.enabled) {
      return;
    }
    this.enabled = false;
    global.clearInterval(this.timer!);
  }

  public change(interval: number, now = false) {
    this.interval = interval;
    this.stop();
    this.start(now);
  }
}
