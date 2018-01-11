export default class TimerWrapper {

  public enabled: boolean;

  private timer: NodeJS.Timer;
  private startTime: number;
  private interval: number;
  private callback: () => void;
  private object: any;

  constructor(timerCallback: () => void, object: any, startTime: number, interval: number) {
    this.interval = interval;
    this.callback = timerCallback;
    this.object = object;
    this.startTime = startTime;

    if (this.startTime <= 0) {
      this.start();
    }
  }

  public start() {
    if (this.enabled) {
      return;
    }
    this.enabled = true;
    global.setTimeout(() => {
      this.timer = global.setInterval(this.callback.bind(this.object), this.interval);
    }, this.startTime);
  }

  public stop() {
    if (!this.enabled) {
      return;
    }
    this.enabled = false;
    global.clearInterval(this.timer);
  }

  public change(startTime: number, interval: number) {
    this.startTime = startTime;
    this.interval = interval;
    if (this.enabled || this.startTime <= 0) {
      this.stop();
      this.start();
    }
  }
}
