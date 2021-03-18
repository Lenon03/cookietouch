import * as net from "net";
import * as tls from "tls";
import * as url from "url";
import Agent from "./agent";

/**
 * The `HttpsProxyAgent` implements an HTTP Agent subclass that connects to the
 * specified "HTTP(s) proxy server" in order to proxy HTTPS requests.
 *
 * @api public
 */

export default class HttpsProxyAgent extends Agent {
  private secureProxy: boolean;
  private proxy: any;
  // private defaultPort: number;

  constructor(opts: any) {
    if ("string" === typeof opts) {
      opts = url.parse(opts);
    }
    if (!opts) {
      throw new Error(
        "an HTTP(S) proxy server `host` and `port` must be specified!"
      );
    }
    // debug("creating new HttpsProxyAgent instance: %o", opts);
    super(opts);

    const proxy = { ...opts };

    // if `true`, then connect to the proxy server over TLS. defaults to `false`.
    this.secureProxy = proxy.protocol
      ? /^https:?$/i.test(proxy.protocol)
      : false;

    // prefer `hostname` over `host`, and set the `port` if needed
    proxy.host = proxy.hostname || proxy.host;
    proxy.port = +proxy.port || (this.secureProxy ? 443 : 80);

    // ALPN is supported by Node.js >= v5.
    // attempt to negotiate http/1.1 for proxy servers that support http/2
    if (this.secureProxy && !("ALPNProtocols" in proxy)) {
      proxy.ALPNProtocols = ["http 1.1"];
    }

    if (proxy.host && proxy.path) {
      // if both a `host` and `path` are specified then it's most likely the
      // result of a `url.parse()` call... we need to remove the `path` portion so
      // that `net.connect()` doesn't attempt to open that as a unix socket file.
      delete proxy.path;
      delete proxy.pathname;
    }

    this.proxy = proxy;
    // this.defaultPort = 443;
  }

  /**
   * Called when the node-core HTTP client library is creating a new HTTP request.
   *
   * @api public
   */

  protected callback(req?: any, opts?: any, fn?: any) {
    const proxy = this.proxy;

    // create a socket connection to the proxy server
    const socket = this.secureProxy ? tls.connect(proxy) : net.connect(proxy);

    // we need to buffer any HTTP traffic that happens with the proxy before we get
    // the CONNECT response, so that if the response is anything other than an "200"
    // response code, then we can re-play the "data" events on the socket once the
    // HTTP parser is hooked up...
    let buffers: Buffer[] | null = [];
    let buffersLength = 0;

    function read() {
      const b = socket.read();
      if (b) {
        ondata(b);
      } else {
        socket.once("readable", read);
      }
    }

    function cleanup() {
      socket.removeListener("data", ondata);
      socket.removeListener("end", onend);
      socket.removeListener("error", onerror);
      socket.removeListener("close", onclose);
      socket.removeListener("readable", read);
    }

    function onclose(err: any) {
      // debug("onclose had error %o", err);
    }

    function onend() {
      // debug("onend");
    }

    function onerror(err: any) {
      cleanup();
      fn(err);
    }

    function ondata(b: Buffer) {
      buffers!.push(b);
      buffersLength += b.length;
      let buffered: Buffer | null = Buffer.concat(buffers!, buffersLength);
      const str = buffered.toString("ascii");

      if (!~str.indexOf("\r\n\r\n")) {
        // keep buffering
        // debug("have not received end of HTTP headers yet...");
        if (socket.read) {
          read();
        } else {
          socket.once("data", ondata);
        }
        return;
      }

      const firstLine = str.substring(0, str.indexOf("\r\n"));
      const statusCode = +firstLine.split(" ")[1];
      // debug("got proxy server response: %o", firstLine);

      if (200 === statusCode) {
        // 200 Connected status code!
        let sock = socket;

        // nullify the buffered data since we won't be needing it
        buffers = buffered = null;

        if (opts.secureEndpoint) {
          // since the proxy is connecting to an SSL server, we have
          // to upgrade this socket connection to an SSL connection
          // debug(
          //   "upgrading proxy-connected socket to TLS connection: %o",
          //   opts.host
          // );
          opts.socket = socket;
          opts.servername = opts.servername || opts.host;
          opts.host = null;
          opts.hostname = null;
          opts.port = null;
          sock = tls.connect(opts);
        }

        cleanup();
        fn(null, sock);
      } else {
        // some other status code that's not 200... need to re-play the HTTP header
        // "data" events onto the socket once the HTTP machinery is attached so that
        // the user can parse and handle the error status code
        cleanup();

        // save a reference to the concat'd Buffer for the `onsocket` callback
        buffers = [buffered];

        // need to wait for the "socket" event to re-play the "data" events
        req.once("socket", onsocket);
        fn(null, socket);
      }
    }

    function onsocket(sockett: any) {
      // replay the "buffers" Buffer onto the `socket`, since at this point
      // the HTTP module machinery has been hooked up for the user
      if ("function" === typeof sockett.ondata) {
        // node <= v0.11.3, the `ondata` function is set on the socket
        sockett.ondata(buffers, 0, buffers!.length);
      } else if (sockett.listeners("data").length > 0) {
        // node > v0.11.3, the "data" event is listened for directly
        sockett.emit("data", buffers);
      } else {
        // never?
        throw new Error("should not happen...");
      }

      // nullify the cached Buffer instance
      buffers = null;
    }

    socket.on("error", onerror);
    socket.on("close", onclose);
    socket.on("end", onend);

    if (socket.read) {
      read();
    } else {
      socket.once("data", ondata);
    }

    const hostname = `${opts.host}:${opts.port}`;
    let msg = `CONNECT ${hostname} HTTP/1.1\r\n`;

    const headers = { ...proxy.headers };
    if (proxy.auth) {
      headers["Proxy-Authorization"] = `Basic ${Buffer.from(
        proxy.auth
      ).toString("base64")}`;
    }

    // the Host header should only include the port
    // number when it is a non-standard port
    let host = opts.host;
    if (!isDefaultPort(opts.port, opts.secureEndpoint)) {
      host += `:${opts.port}`;
    }
    headers.Host = host;

    headers.Connection = "close";
    Object.keys(headers).forEach(name => {
      msg += `${name}: ${headers[name]}\r\n`;
    });

    socket.write(`${msg}\r\n`);
  }
}

function isDefaultPort(port: 80 | 443, secure: boolean) {
  return Boolean((!secure && port === 80) || (secure && port === 443));
}
