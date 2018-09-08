import Map from "@/protocol/data/map";
import { GraphicSizes } from "@/protocol/data/map/AtlasLayout";
import Cell from "@/protocol/data/map/Cell";
import DTConstants from "@/protocol/DTConstants";
import {
  existsAsync,
  mkdirp,
  readFileAsync,
  writeFileAsync
} from "@/utils/fsAsync";
import axios from "axios";
import { remote } from "electron";
import { join } from "path";

export default class MapsManager {
  public static async getMap(mapId: number): Promise<Map> {
    const filePath = await this.getFilePath(mapId);
    if (await existsAsync(filePath)) {
      const file = await readFileAsync(filePath);
      return this.buildMap(JSON.parse(file.toString()));
    }

    const response = await axios.get(
      DTConstants.config.assetsUrl + "/maps/" + mapId + ".json"
    );
    const data = response.data;
    await writeFileAsync(filePath, JSON.stringify(data));
    return this.buildMap(data);
  }

  private static async getFilePath(id: number): Promise<string> {
    const folderPath = join(
      remote.app.getPath("userData"),
      "assets",
      DTConstants.assetsVersion,
      "maps"
    );

    if (!(await existsAsync(folderPath))) {
      await mkdirp(folderPath);
    }

    return join(folderPath, `${id}.json`);
  }

  private static buildMap(json: any): Map {
    const map = new Map(
      json.id,
      json.topNeighbourId,
      json.bottomNeighbourId,
      json.leftNeighbourId,
      json.rightNeighbourId
    );
    for (const cell of json.cells) {
      map.cells.push(new Cell(cell.l, cell.f, cell.c, cell.s, cell.z));
    }
    for (const key in json.midgroundLayer) {
      if (json.midgroundLayer.hasOwnProperty(key)) {
        const values = json.midgroundLayer[key];
        for (let i = 0; i < values.length; i++) {
          values[i] = { id: parseInt(key, 10), ...values[i] };
        }
        map.midgroundLayer.set(parseInt(key, 10), values);
      }
    }
    map.atlasLayout.width = json.atlasLayout.width;
    map.atlasLayout.height = json.atlasLayout.height;
    for (const key in json.atlasLayout.graphicsPositions) {
      if (json.atlasLayout.graphicsPositions.hasOwnProperty(key)) {
        const gs = json.atlasLayout.graphicsPositions[key] as GraphicSizes;
        map.atlasLayout.graphicsPositions.set(parseInt(key, 10), gs);
      }
    }

    return map;
  }
}
