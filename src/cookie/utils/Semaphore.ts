export default class Semaphore {
  public count: number;
  private tasks: Array<(() => void)> = [];

  constructor(count: number) {
    this.count = count;
  }

  public acquire() {
    return new Promise<() => void>((res: any, rej: any) => {
      const task = () => {
        let released = false;
        res(() => {
          if (!released) {
            released = true;
            this.count++;
            this.sched();
          }
        });
      };
      this.tasks.push(task);
      if (process && process.nextTick) {
        process.nextTick(this.sched.bind(this));
      } else {
        setImmediate(this.sched.bind(this));
      }
    });
  }

  public use<T>(f: () => Promise<T>) {
    return this.acquire().then((release: any) => {
      return f()
        .then(res => {
          release();
          return res;
        })
        .catch(err => {
          release();
          throw err;
        });
    });
  }

  private sched() {
    if (this.count > 0 && this.tasks.length > 0) {
      this.count--;
      const next = this.tasks.shift();
      if (next === undefined) {
        throw new Error("Unexpected undefined value in tasks list");
      }

      next();
    }
  }
}

export class Mutex extends Semaphore {
  constructor() {
    super(1);
  }
}
