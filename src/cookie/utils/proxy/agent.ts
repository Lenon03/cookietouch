import { EventEmitter } from "events";
import { promisify } from "util";

function isAgent(v: any) {
  return v && typeof v.addRequest === "function";
}

export default class Agent extends EventEmitter {
  private _promisifiedCallback: boolean;
  private timeout: number | null = null;
  private options: any;

  constructor(callback?: () => void, _opts: { timeout?: number } = {}) {
    super();
    if (!(this instanceof Agent)) {
      return new Agent(callback, _opts);
    }

    // The callback gets promisified if it has 3 parameters
    // (i.e. it has a callback function) lazily
    this._promisifiedCallback = false;

    let opts = _opts;
    if ("function" === typeof callback) {
      this.callback = callback;
    } else if (callback) {
      opts = callback;
    }

    // timeout for the socket to be returned from the callback
    this.timeout = (opts && opts.timeout) || null;

    this.options = opts;
  }

  /**
   * Called by node-core's "_http_client.js" module when creating
   * a new HTTP request with this Agent instance.
   *
   * @api public
   */
  public addRequest(req: any, _opts: any) {
    const ownOpts = { ..._opts };

    // Set default `host` for HTTP to localhost
    if (null == ownOpts.host) {
      ownOpts.host = "localhost";
    }

    // Set default `port` for HTTP if none was explicitly specified
    if (null == ownOpts.port) {
      ownOpts.port = ownOpts.secureEndpoint ? 443 : 80;
    }

    const opts = { ...this.options, ...ownOpts };

    if (opts.host && opts.path) {
      // If both a `host` and `path` are specified then it's most likely the
      // result of a `url.parse()` call... we need to remove the `path` portion so
      // that `net.connect()` doesn't attempt to open that as a unix socket file.
      delete opts.path;
    }

    delete opts.agent;
    delete opts.hostname;
    delete opts._defaultAgent;
    delete opts.defaultPort;
    delete opts.createConnection;

    // Hint to use "Connection: close"
    // XXX: non-documented `http` module API :(
    req._last = true;
    req.shouldKeepAlive = false;

    // Create the `stream.Duplex` instance
    let timeout: NodeJS.Timer | null = null;
    let timedOut = false;
    const timeoutMs = this.timeout;
    const freeSocket = this.freeSocket;

    function onerror(err: any) {
      if (req._hadError) {
        return;
      }
      req.emit("error", err);
      // For Safety. Some additional errors might fire later on
      // and we need to make sure we don't double-fire the error event.
      req._hadError = true;
    }

    function ontimeout() {
      timeout = null;
      timedOut = true;
      const err = new Error(
        `A "socket" was not created for HTTP request before ${timeoutMs}ms`
      );
      err.name = "ETIMEOUT";
      onerror(err);
    }

    function callbackError(err: any) {
      if (timedOut) {
        return;
      }
      if (timeout != null) {
        clearTimeout(timeout);
        timeout = null;
      }
      onerror(err);
    }

    function onsocket(socket: any) {
      if (timedOut) {
        return;
      }
      if (timeout != null) {
        clearTimeout(timeout);
        timeout = null;
      }
      if (isAgent(socket)) {
        // `socket` is actually an http.Agent instance, so relinquish
        // responsibility for this `req` to the Agent from here on
        socket.addRequest(req, opts);
      } else if (socket) {
        function onfree() {
          freeSocket(socket, opts);
        }
        socket.on("free", onfree);
        req.onSocket(socket);
      } else {
        const err = new Error(
          `no Duplex stream was returned to agent-base for \`${req.method} ${
            req.path
          }\``
        );
        onerror(err);
      }
    }

    if (!this._promisifiedCallback && this.callback.length >= 3) {
      // Legacy callback function - convert to a Promise
      this.callback = promisify(this.callback);
      this._promisifiedCallback = true;
    }

    if (timeoutMs && timeoutMs > 0) {
      timeout = setTimeout(ontimeout, timeoutMs);
    }

    try {
      Promise.resolve(this.callback(req, opts)).then(onsocket, callbackError);
    } catch (err) {
      Promise.reject(err).catch(callbackError);
    }
  }

  protected callback(req?: any, opts?: any, fn?: any) {
    throw new Error(
      '"agent-base" has no default implementation, you must subclass and override `callback()`'
    );
  }

  private freeSocket(socket: any, opts: any) {
    // TODO reuse sockets
    socket.destroy();
  }
}
