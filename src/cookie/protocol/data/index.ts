import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import axios from "axios";
import { remote } from "electron";
import * as fs from "fs";
import * as path from "path";
import DTConstants from "../DTConstants";
import Data from "./Data";
import { DataTypes } from "./DataTypes";

export interface IDataResponse<T> {
  id: number;
  object: T;
}

export default class DataManager {
  public static async get<T extends Data>(
    type: DataTypes,
    ...ids: number[]
  ): Promise<Array<IDataResponse<T>>> {
    const myArray: Array<IDataResponse<T>> = [];
    const newIds = [];
    for (const id of ids) {
      const filePath = this.getFilePath(DataTypes[type], id);
      if (fs.existsSync(filePath)) {
        const file = fs.readFileSync(filePath);
        myArray.push(JSON.parse(file.toString()));
      } else {
        newIds.push(id);
      }
    }
    if (newIds.length === 0) {
      return myArray;
    }
    const params = {
      lang: GlobalConfiguration.lang,
      v: DTConstants.assetsVersion
    };
    const response = await axios.post(
      `${DTConstants.config.dataUrl}/data/map?lang=${params.lang}&v=${
        params.v
      }`,
      {
        class: DataTypes[type],
        ids: newIds
      }
    );
    for (const item in response.data) {
      if (response.data.hasOwnProperty(item)) {
        const dataRes = {
          id: parseInt(item, 10),
          object: response.data[item]
        } as IDataResponse<T>;
        fs.writeFileSync(
          this.getFilePath(DataTypes[type], dataRes.id),
          JSON.stringify(dataRes)
        );
      }
    }
    this.buildData(response.data, myArray);
    return myArray;
  }

  private static buildData<T extends Data>(
    json: any,
    array: Array<IDataResponse<T>>
  ) {
    for (const item in json) {
      if (json.hasOwnProperty(item)) {
        const dataRes = {
          id: parseInt(item, 10),
          object: json[item]
        } as IDataResponse<T>;
        array.push(dataRes);
      }
    }
  }

  private static getFilePath(type: string, id: number): string {
    let folderPath = path.join(
      remote.app.getPath("userData"),
      DTConstants.assetsVersion
    );
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    folderPath = path.join(folderPath, "data");
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    folderPath = path.join(folderPath, GlobalConfiguration.lang);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    folderPath = path.join(folderPath, type);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    return path.join(folderPath, `${id}.json`);
  }
}
