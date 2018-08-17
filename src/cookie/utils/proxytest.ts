import * as https from "https";
// import * as Tls from "tls";
// import * as Util from "util";

export default class HttpsProxyAgent extends https.Agent {
  constructor(options?: https.AgentOptions) {
    super(options);
  }
}

/**
 * HTTPS Agent for node.js HTTPS requests via a proxy.
 * blog.vanamco.com/connecting-via-proxy-node-js/
 */

// function HttpsProxyAgent2(options) {
//   Https.Agent.call(this, options);

//   this.proxyHost = options.proxyHost;
//   this.proxyPort = options.proxyPort;

//   this.createConnection = (opts, callback) => {
//     // do a CONNECT request
//     const req = Https.request({
//       headers: {
//         host: opts.host
//       },
//       host: options.proxyHost,
//       method: "CONNECT",
//       path: opts.host + ":" + opts.port,
//       port: options.proxyPort
//     });

//     req.on("connect", (res, socket, head) => {
//       const cts = Tls.connect(
//         {
//           host: opts.host,
//           socket
//         },
//         () => {
//           callback(false, cts);
//         }
//       );
//     });

//     req.on("error", err => {
//       callback(err, null);
//     });

//     req.end();
//   };
// }

// Util.inherits(HttpsProxyAgent, Https.Agent);

// // Almost verbatim copy of http.Agent.addRequest
// // HttpsProxyAgent.prototype.addRequest = function(req, host, port, localAddress) // node v0.10.x
// HttpsProxyAgent.prototype.addRequest = function(
//   req,
//   options // node v0.12.x
// ) {
//   /* node v0.10.x
//     var name = host + ':' + port;
//     if (localAddress)
//         name += ':' + localAddress;
//     */
//   let name = options.host + ":" + options.port;
//   if (options.path) {
//     name += ":" + options.path;
//   }

//   if (!this.sockets[name]) {
//     this.sockets[name] = [];
//   }

//   if (this.sockets[name].length < this.maxSockets) {
//     // if we are under maxSockets create a new one.
//     // this.createSocket(name, host, port, localAddress, req, function(socket)  // node 0.10.x
//     this.createSocket(name, options.host, options.port, options.path, req, (
//       socket: NodeJS.Socket // node 0.12.x
//     ) => {
//       req.onSocket(socket);
//     });
//   } else {
//     // we are over limit so we'll add it to the queue.
//     if (!this.requests[name]) {
//       this.requests[name] = [];
//     }
//     this.requests[name].push(req);
//   }
// };

// // Almost verbatim copy of http.Agent.createSocket
// HttpsProxyAgent.prototype.createSocket = function(
//   name,
//   host,
//   port,
//   localAddress,
//   req,
//   callback
// ) {
//   const options = Util._extend({}, self.options);
//   options.port = port;
//   options.host = host;
//   options.localAddress = localAddress;

//   options.servername = host;
//   if (req) {
//     const hostHeader = req.getHeader("host");
//     if (hostHeader) {
//       options.servername = hostHeader.replace(/:.*$/, "");
//     }
//   }

//   self.createConnection(options, (err, s) => {
//     if (err) {
//       err.message +=
//         " while connecting to HTTP(S) proxy server " +
//         self.proxyHost +
//         ":" +
//         self.proxyPort;

//       if (req) {
//         req.emit("error", err);
//       } else {
//         throw err;
//       }

//       return;
//     }

//     if (!self.sockets[name]) {
//       self.sockets[name] = [];
//     }

//     self.sockets[name].push(s);

//     const onFree = () => {
//       self.emit("free", s, host, port, localAddress);
//     };

//     const onClose = error => {
//       // this is the only place where sockets get removed from the Agent.
//       // if you want to remove a socket from the pool, just close it.
//       // all socket errors end in a close event anyway.
//       self.removeSocket(s, name, host, port, localAddress);
//     };

//     const onRemove = () => {
//       // we need this function for cases like HTTP 'upgrade'
//       // (defined by WebSockets) where we need to remove a socket from the pool
//       // because it'll be locked up indefinitely
//       self.removeSocket(s, name, host, port, localAddress);
//       s.removeListener("close", onClose);
//       s.removeListener("free", onFree);
//       s.removeListener("agentRemove", onRemove);
//     };

//     s.on("free", onFree);
//     s.on("close", onClose);
//     s.on("agentRemove", onRemove);

//     callback(s);
//   });
// };
