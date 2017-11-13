import axios from "axios";

const MAIN_URL = "https://proxyconnection.touch.dofus.com";

export default class HaapiConnection {

  public config: any;
  public haapi: any;
  public token: string;

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
      axios.get(`${MAIN_URL}/config.json`)
        .then((response) => resolve(response.data))
        .catch((error) => reject(new Error("Error in config loading ! (" + error.message + ")")));
    });
  }

  private createApiKey(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      axios.post(`${this.config.haapi.url}/Api/CreateApiKey`,
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
      axios.get(`${this.config.haapi.url}/Account/CreateToken`, config)
        .then((response) => resolve(response.data.token))
        .catch((error) => reject(new Error("Error in getToken loading ! (" + error.message + ")")));
    });
  }
}
