import DTConstants from "@protocol/DTConstants";
import Dictionary from "@utils/Dictionary";
import axios from "axios";
import Cell from "./Cell";
import Map from "./index";

export default class MapsManager {
  public static getMap(mapId: number): Promise<Map> {
    return new Promise((resolve, reject) => {
      if (this.mapsCache.containsKey(mapId)) {
        return resolve(this.mapsCache.getValue(mapId));
      }
      axios.get(DTConstants.config.assetsUrl + "/maps/" + mapId + ".json")
        .then((response) => {
          const data = response.data;
          const map = new Map(data.id, data.topNeighbourId,
            data.bottomNeighbourId, data.leftNeighbourId, data.rightNeighbourId);
          for (const cell of data.cells) {
            map.cells.push(new Cell(cell.l, cell.f, cell.c, cell.s, cell.z));
          }
          for (const key in data.midgroundLayer) {
            if (data.midgroundLayer.hasOwnProperty(key)) {
              const values = data.midgroundLayer[key];
              for (let i = 0; i < values.length; i++) {
                values[i] = Object.assign({id: parseInt(key, 10)}, values[i]);
              }
              map.midgroundLayer.add(parseInt(key, 10), values);
            }
          }
          this.mapsCache.add(mapId, map);
          return resolve(map);
        });
    });
  }
  private static mapsCache = new Dictionary<number, Map>();
}
