import { extend, isFunction } from "lodash";

let tokenId = 0;

export interface IOptions {
  autoResetCount: number;
  maxQueueSize: number;
  overflowStrategy: string;
}

export interface IToken {
  callback: () => any;
  elapsed: () => number;
  id: number;
  isCanceled: boolean;
  resetEvent: () => any;
  start: Date;
  timeoutId: NodeJS.Timer;
}

/**
 * A Reset Event.
 * @constructor
 * @param {boolean} isSignaled - if true then the reset event starts signaled (all calls to wait will pass through)
 * @param {object} options - optional set of options for this reset event
 */
export default class ResetEvent {

  private static defaultOptions: IOptions = {
    autoResetCount: Infinity,
    maxQueueSize: Infinity,
    overflowStrategy: "this",
  };

  /**
   * Checks if this reset event is signaled. A signaled reset event executes all callbacks immediately.
   */
  public isSignaled: boolean;

  private queue: IToken[];
  private options: IOptions;
  private callbacksCount: number;

  /**
   * Returns the number of pending callbacks
   */
  public get queueSize() {
    return this.queue.length;
  }

  constructor(isSignaled?: boolean, options?: IOptions) {
    this.queue = [];
    this.isSignaled = isSignaled;
    this.options = extend({}, ResetEvent.defaultOptions, options);
  }

  /**
   * A function that is used to create a token. Override if needed.
   * @param {function} callback - The callback associated with the token.
   */
  public createToken(callback: () => any): IToken {
    const token = {
      callback,
      id: tokenId++,
      isCanceled: false,
      resetEvent: this.set,
      start: new Date(),
      timeoutId: null as NodeJS.Timer,
    } as IToken;
    token.elapsed = () => new Date().getTime() - token.start.getTime();
    return token;
  }

  /**
   * Removes items from the given queue based on the given options
   * @param {array} queue - The queue of tokens
   * @param {object} options - The options that control the reduction algorithm
   * @returns an array of the tokens which were removed from the queue
   */
  public reduceQueue(queue: any[], options: any) {
    const result: any[] = [];
    if ((typeof options.maxQueueSize !== "number") || isNaN(options.maxQueueSize)) {
      return result;
    }

    if (queue.length > options.maxQueueSize) {
      if (options.overflowStrategy === "last") {
        const last = queue.pop();
        while (queue.length && queue.length > (options.maxQueueSize - 1)) {
          result.unshift(queue.pop());
        }
        queue.push(last);
        return result;
      }

      if (options.overflowStrategy === "first") {
        while (queue.length && queue.length > options.maxQueueSize) {
          result.push(queue.shift());
        }
        return result;
      }

      if (queue.length && options.overflowStrategy === "this") {
        result.push(queue.pop());
        return result;
      }
    }

    return result;
  }

  /**
   * A function that is used to execute the user callback. Default implementation invokes the callback synchronously.
   * Override if needed.
   * @param {object} token - The the token which contains the callback to call.
   */
  public executeCallback(token: any) {
    token.callback(token);
  }

  /**
   * Takes control over the reset event, callers to wait will wait until the reset event is reset.
   */
  public reset() {

    if (this.isSignaled === false) {
      throw new Error("The reset event is already in a non signaled state");
    }

    this.isSignaled = false;
  }

  /**
   * Releases all the callbacks waiting on the reset event.
   */

  public set() {
    let queueToken;

    if (this.isSignaled === true) {
      throw new Error("The reset event is already in a signaled state");
    }

    this.callbacksCount = this.options.autoResetCount;

    while (this.queue.length > 0) {
      queueToken = this.queue.shift();
      this.callbacksCount--;

      if (queueToken.timeoutId && this.callbacksCount > 0) {
        clearTimeout(queueToken.timeoutId);
      }

      if (queueToken.isCanceled) {
        this.callbacksCount++;
      } else {
        this.executeCallback(queueToken);
        if (this.callbacksCount === 0) {
          return;
        }
      }
    }
    this.isSignaled = true;
  }

  /**
   * Waits until the reset event becomes signaled then executes the callback.
   * If the reset event is signaled when wait is called, the callback is executed immediately.
   * @param {function} callback - the function to execute when the reset event becomes signaled
   * @param {number} [timeout] - The amount of time to wait in milliseconds before canceling the callback call.
   * The callback is of the form foo(token) (i.e. it will receive the acquired token as a parameter when called)
   * @returns {object} token - A token which can be used to cancel the callback and to track the elapsed time
   */
  public wait(callback: () => any, timeout?: number) {
    if (!isFunction(callback)) {
      throw new Error("Callback must be a function");
    }

    const token = this.createToken(callback);

    if (token === null || token === undefined) {
      throw new Error("Token cannot be null or undefined");
    }

    if (timeout) {
      token.timeoutId = setTimeout(() => {
        token.isCanceled = true;
        token.timeoutId = null;
      }, timeout);
    }

    if (this.isSignaled) {
      this.executeCallback(token);
      this.callbacksCount--;
      if (this.callbacksCount === 0) {
        this.isSignaled = false;
      }
    } else {
      this.queue.push(token);
    }

    let i;
    const reducedTokens = this.reduceQueue(this.queue, this.options);
    for (i = 0; i < reducedTokens.length; i++) {
      reducedTokens[i].isCanceled = true;
      if (reducedTokens[i].timeoutId) {
        clearTimeout(reducedTokens[i].timeoutId);
      }
    }

    return token;
  }
}
