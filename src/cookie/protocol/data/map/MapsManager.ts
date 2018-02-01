import DTConstants from "@protocol/DTConstants";
import axios from "axios";
import {remote} from "electron";
import * as fs from "fs";
import * as path from "path";
import Cell from "./Cell";
import Map from "./index";

export default class MapsManager {

  public static async getMap(mapId: number): Promise<Map> {
    const filePath = this.getFilePath(mapId);
    if (fs.existsSync(filePath)) {
      const file = fs.readFileSync(filePath);
      return this.buildMap(JSON.parse(file.toString()));
    }

    const response = await axios.get(DTConstants.config.assetsUrl + "/maps/" + mapId + ".json");
    const data = response.data;
    fs.writeFileSync(filePath, JSON.stringify(data));
    return this.buildMap(data);
  }

  private static getFilePath(id: number): string {
    let folderPath = path.join(remote.app.getPath("userData"), DTConstants.assetsVersion);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    folderPath = path.join(folderPath, "maps");
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    return path.join(folderPath, `${id}.json`);
  }

  private static buildMap(json: any): Map {
    const map = new Map(json.id, json.topNeighbourId,
      json.bottomNeighbourId, json.leftNeighbourId, json.rightNeighbourId);
    for (const cell of json.cells) {
      map.cells.push(new Cell(cell.l, cell.f, cell.c, cell.s, cell.z));
    }
    for (const key in json.midgroundLayer) {
      if (json.midgroundLayer.hasOwnProperty(key)) {
        const values = json.midgroundLayer[key];
        for (let i = 0; i < values.length; i++) {
          values[i] = Object.assign({id: parseInt(key, 10)}, values[i]);
        }
        map.midgroundLayer.add(parseInt(key, 10), values);
      }
    }
    return map;
  }
}
