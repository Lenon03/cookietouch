import Account from "@/account";
import LanguageManager from "@/configurations/language/LanguageManager";
import { HaapiErrorReasons, IHaapi } from "@/network/IHaapi";
import DTConstants from "@/protocol/DTConstants";
import axios, { AxiosInstance } from "axios";

export default class HaapiConnection {
  public haapi: IHaapi;
  public token: string;

  private axios: AxiosInstance;

  constructor(account: Account) {
    this.axios = axios.create({});
    /*
    // const agent = new HttpsProxyAgent("http://178.32.80.239:1080");
    const config: AxiosRequestConfig = {
      httpsAgent: agent,
      proxy: false
    };
    const config: AxiosRequestConfig = {
      proxy: {
        host: account.accountConfig.proxy.ip,
        port: account.accountConfig.proxy.port
      }
    };
    if (account.accountConfig.proxy.username.length > 0) {
      (config.proxy as AxiosProxyConfig).auth = {
        password: account.accountConfig.proxy.password,
        username: account.accountConfig.proxy.username
      };
    }
    this.axios = axios.create(config);
    this.axios
      .get("https://api.ipify.org?format=json")
      .then(res => console.log("xxx res", res.data));
    */
  }

  public async processHaapi(username: string, password: string): Promise<void> {
    try {
      this.haapi = await this.createApiKey(username, password);

      if (this.haapi.reason) {
        switch (this.haapi.reason) {
          case HaapiErrorReasons.FAILED:
            throw new Error(LanguageManager.trans("wrongCredentials"));
          case HaapiErrorReasons.BAN:
            throw new Error(LanguageManager.trans("accountBan"));
        }
      }

      this.token = await this.getToken();
    } catch (e) {
      throw new Error(e.message);
    }
  }

  private async createApiKey(
    username: string,
    password: string
  ): Promise<IHaapi> {
    try {
      const response = await this.axios.post(
        `${DTConstants.config.haapi.url}/Api/CreateApiKey`,
        "login=" + username + "&password=" + password + "&long_life_token=false"
      );
      return response.data;
    } catch (e) {
      if (e.response.status === 601) {
        return e.response.data;
      }
      throw new Error(e.message);
    }
  }

  private async getToken(): Promise<string> {
    const config = {
      headers: {
        apikey: this.haapi.key
      },
      params: {
        game: DTConstants.config.haapi.id
      }
    };
    try {
      const response = await this.axios.get(
        `${DTConstants.config.haapi.url}/Account/CreateToken`,
        config
      );
      return response.data.token;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
