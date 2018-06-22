import LanguageManager from "@/configurations/language/LanguageManager";
import { HaapiErrorReasons, IHaapi } from "@/network/IHaapi";
import DTConstants from "@/protocol/DTConstants";
import axios from "axios";

export default class HaapiConnection {
  public haapi: IHaapi;
  public token: string;

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
      const response = await axios.post(
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
      const response = await axios.get(
        `${DTConstants.config.haapi.url}/Account/CreateToken`,
        config
      );
      return response.data.token;
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
