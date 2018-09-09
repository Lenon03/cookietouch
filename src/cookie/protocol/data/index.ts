import GlobalConfiguration from "@/configurations/GlobalConfiguration";
import Data from "@/protocol/data/Data";
import { DataTypes } from "@/protocol/data/DataTypes";
import DTConstants from "@/protocol/DTConstants";
import {
  existsAsync,
  mkdirRecursive,
  readFileAsync,
  writeFileAsync
} from "@/utils/fsAsync";
import axios from "axios";
import { remote } from "electron";
import { join } from "path";

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
      const filePath = await this.getFilePath(DataTypes[type], id);
      if (await existsAsync(filePath)) {
        const file = await readFileAsync(filePath);
        myArray.push(JSON.parse(file.toString()));
      } else {
        newIds.push(id);
      }
    }
    if (newIds.length === 0 && ids.length > 0) {
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
    const writePromises = Object.entries(response.data).map(async item => {
      const dataRes = {
        id: parseInt(item["0"], 10),
        object: item["1"]
      } as IDataResponse<T>;
      const filePath = await this.getFilePath(DataTypes[type], dataRes.id);
      return writeFileAsync(filePath, JSON.stringify(dataRes));
    });
    await Promise.all(writePromises);
    this.buildData(response.data, myArray);
    return myArray;
  }

  private static buildData<T extends Data>(
    json: any,
    array: Array<IDataResponse<T>>
  ) {
    for (const item of Object.entries(json)) {
      const dataRes = {
        id: parseInt(item["0"], 10),
        object: item["1"]
      } as IDataResponse<T>;
      array.push(dataRes);
    }
  }

  private static async getFilePath(type: string, id: number): Promise<string> {
    const folderPath = join(
      remote.app.getPath("userData"),
      "assets",
      DTConstants.assetsVersion,
      "data",
      GlobalConfiguration.lang,
      type
    );

    if (!(await existsAsync(folderPath))) {
      mkdirRecursive(folderPath);
    }

    return join(folderPath, `${id}.json`);
  }
}
