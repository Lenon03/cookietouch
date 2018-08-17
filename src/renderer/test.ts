// import HttpsProxyAgent from "@/utils/proxy/https";
// import axios, { AxiosRequestConfig } from "axios";
// import { IncomingMessage } from "http";
// import * as https from "https";
// // import { parse } from "url";
// import Websocket from "ws";

// ////////////////////////////////////
// ////////////// SERVER //////////////
// ////////////////////////////////////

// const wss = new Websocket.Server({
//   perMessageDeflate: {
//     // Other options settable:
//     clientMaxWindowBits: 10, // Defaults to negotiated value.
//     clientNoContextTakeover: true, // Defaults to negotiated value.
//     concurrencyLimit: 10, // Limits zlib concurrency for perf.
//     serverMaxWindowBits: 10, // Defaults to negotiated value.
//     serverNoContextTakeover: true, // Defaults to negotiated value.
//     threshold: 1024 // Size (in bytes) below which messages
//     // should not be compressed.
//     // zlibDeflateOptions: {
//     //   // See zlib defaults.
//     //   chunkSize: 1024,
//     //   level: 3,
//     //   memLevel: 7
//     // },
//     // zlibInflateOptions: {
//     //   chunkSize: 10 * 1024
//     // }
//   },
//   port: 8080
// });

// wss.on("connection", (ws, req: IncomingMessage) => {
//   const f = req.headers["x-forwarded-for"];
//   const ip = f ? (f as string).split(/\s*,\s*/)[0] : req.headers.host;
//   console.log("connection from " + ip);
//   ws.on("message", message => {
//     console.log("received: ", message);
//   });

//   ws.send("something");
// });

// ////////////////////////////////////
// ////////////////////////////////////
// ////////////////////////////////////

// // HTTP/HTTPS proxy to connect to
// const proxy = "http://186.193.186.3:20183";
// console.log("using proxy server ", proxy);

// // WebSocket endpoint for the proxy to connect to
// const endpoint = "ws://localhost:8080";
// // const parsed = parse(endpoint);
// console.log("attempting to connect to WebSocket", endpoint);

// // create an instance of the `HttpsProxyAgent` class with the proxy server information
// // const options = parse(proxy);

// const agent = new HttpsProxyAgent(proxy);

// // finally, initiate the WebSocket connection
// const socket = new Websocket(endpoint, "", { agent });

// socket.on("open", () => {
//   console.log('"open" event!');
//   socket.send("hello world");
// });

// socket.on("message", (data, flags) => {
//   console.log('"message" event! ', data, flags);
//   socket.close();
// });

// socket.on("error", error => console.error(error));

// /////////////////////////////////////////////////
// /////////////////////////////////////////////////

// const opts: https.RequestOptions = {
//   // agent,
//   host: "ip.jsontest.com",
//   method: "POST",
//   path: "/",
//   port: 80,
//   timeout: 10000
// };
// const post_req = https.request(opts, res => {
//   res.setEncoding("utf8");
//   res.on("data", chunk => {
//     console.log("Response: " + chunk);
//   });
// });
// // post_req.write("name=john");
// post_req.end();

// const config: AxiosRequestConfig = {
//   baseURL: "http://ip.jsontest.com:80",
//   httpsAgent: agent,
//   proxy: false
// };

// const myaxios = axios.create(config);
// myaxios.get("/").then(res => console.log("xxx res", res.data));
