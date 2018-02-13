import axios from "axios";
import { IDofusTouchConfig } from "./IDofusTouchConfig";

export default class DTConstants {
  public static readonly MAIN_URL = "https://proxyconnection.touch.dofus.com";
  public static appVersion: string;
  public static buildVersion: string;
  public static assetsVersion: string;
  public static staticDataVersion: string;
  public static config: IDofusTouchConfig;

  public static readonly MAP_WIDTH = 14;
  public static readonly MAP_HEIGHT = 20;
  public static readonly ORIGINAL_WIDTH = 1267;
  public static readonly ORIGINAL_HEIGHT = 866;
  // public static readonly TILE_WIDTH = DTConstants.ORIGINAL_WIDTH / DTConstants.MAP_WIDTH;
  // public static readonly TILE_HEIGHT = DTConstats.ORIGINAL_HEIGHT / DTConstants.MAP_HEIGHT;
  public static readonly TILE_WIDTH = 43 + 43 * 0.5;
  public static readonly TILE_HEIGHT = 21.5 + 21.5 * 0.35;

  public static async Init() {
    this.config = await DTConstants.getConfig();
    const m = await DTConstants.getAssetsVersions();
    this.assetsVersion = m.assetsVersion;
    this.staticDataVersion = m.staticDataVersion;
    this.appVersion = await DTConstants.getAppVersion();
    this.buildVersion = await DTConstants.getBuildVersion();
  }

  public static async getConfig(): Promise<IDofusTouchConfig> {
    const response = await axios.get(`${DTConstants.MAIN_URL}/config.json`);
    return response.data;
  }

  public static async getAssetsVersions(): Promise<any> {
    const response = await axios.get(`${DTConstants.MAIN_URL}/assetsVersions.json`);
    return response.data;
  }

  public static async getAppVersion(): Promise<string> {
    const response = await axios.get("https://itunes.apple.com/lookup", {
      params: {
        country: "fr",
        id: 1041406978,
        lang: "fr",
        limit: 1,
      },
    });
    return response.data.results[0].version;
  }

  public static async getBuildVersion(): Promise<string> {
    const response = await axios.get(`${DTConstants.MAIN_URL}/build/script.js`);
    const regex = /.*buildVersion=("|')([0-9]*\.[0-9]*\.[0-9]*)("|')/g;
    const m = regex.exec(response.data.substring(1, 10000));
    return m[2];
  }
}
