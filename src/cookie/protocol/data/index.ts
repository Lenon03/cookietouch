import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import Dictionary from "@/utils/Dictionary";
import axios from "axios";
import DTConstants from "../DTConstants";
import Data from "./Data";
import { DataTypes } from "./DataTypes";

export interface IDataResponse<T> {
  id: number;
  object: T;
}

export default class DataManager {

  public static async get<T extends Data>(type: { new(): T }, ...ids: number[]): Promise<Array<IDataResponse<T>>> {
    const myArray: Array<IDataResponse<T>> = [];
    const params = {
      lang: GlobalConfiguration.lang,
      v: DTConstants.assetsVersion,
    };
    const response = await axios.post(`${DTConstants.config.dataUrl}/data/map?lang=${params.lang}&v=${params.v}`, {
      class: type.name,
      ids,
    });
    for (const item in response.data) {
      if (response.data.hasOwnProperty(item)) {
        const dataRes = { id: parseInt(item, 10), object: response.data[item] } as IDataResponse<T>;
        myArray.push(dataRes);
      }
    }
    return myArray;
  }
}
