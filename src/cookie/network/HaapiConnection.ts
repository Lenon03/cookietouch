import DTConstants from "@protocol/DTConstants";
import axios from "axios";

export default class HaapiConnection {

  public haapi: any;
  public token: string;

  public processHaapi(username: string, password: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        this.haapi = await this.createApiKey(username, password);
        this.token = await this.getToken();
        return resolve();
      } catch (e) {
        return reject(e);
      }
    });
  }

  private createApiKey(username: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      axios.post(`${DTConstants.config.haapi.url}/Api/CreateApiKey`,
        "login=" + username + "&password=" + password + "&long_life_token=false")
        .then((response) => resolve(response.data))
        .catch((error) => reject(new Error("Error in apikey loading ! (" + error.message + ")")));
    });
  }

  private getToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          apikey: this.haapi.key,
        },
        params: {
          game: DTConstants.config.haapi.id,
        },
      };
      axios.get(`${DTConstants.config.haapi.url}/Account/CreateToken`, config)
        .then((response) => resolve(response.data.token))
        .catch((error) => reject(new Error("Error in getToken loading ! (" + error.message + ")")));
    });
  }
}
