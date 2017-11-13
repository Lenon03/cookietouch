import axios from "axios";

const HAAPI_SETTINGS = {
  CONFIG_URI: "https://proxyconnection.touch.dofus.com/config.json",
  CREATE_API_URI: "https://haapi.ankama.com/json/Ankama/v2/Api/CreateApiKey",
  TOKEN_CREATION_URI: "https://haapi.ankama.com/json/Ankama/v2/Account/CreateToken",
};

export default class HaapiConnection {

  public config: any;
  public haapi: any;
  public token: string;

  constructor() {
    this.config = null;
    this.haapi = null;
    this.token = null;
  }

  public processHaapi(username: string, password: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      this.config = await this.getConfig();
      this.haapi = await this.createApiKey(username, password);
      this.token = await this.getToken();
      resolve();
    });
  }

  private getConfig(): Promise<any> {
    return new Promise((resolve, reject) => {
      axios.get(HAAPI_SETTINGS.CONFIG_URI)
        .then((response) => resolve(response.data))
        .catch((error) => reject(new Error("Error in config loading ! (" + error.message + ")")));
    });
  }

  private createApiKey(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      axios.post(HAAPI_SETTINGS.CREATE_API_URI,
        "login=" + username + "&password=" + password + "&long_life_token=false")
        .then((response) => resolve(response.data))
        .catch((error) => reject(new Error("Error in apikey loading ! (" + error.message + ")")));
    });
  }

  private getToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      const config = {
        params: {
          game: this.config.haapi.id,
        },
        headers: {
          apikey: this.haapi.key,
        },
      };
      axios.get(HAAPI_SETTINGS.TOKEN_CREATION_URI, config)
        .then((response) => resolve(response.data.token))
        .catch((error) => reject(new Error("Error in getToken loading ! (" + error.message + ")")));
    });
  }
}
