declare var __static;

const isDevelopment = process.env.NODE_ENV === "development";

export const staticPath = isDevelopment
  ? __static
  : __dirname.replace(/app\.asar$/, "static");
