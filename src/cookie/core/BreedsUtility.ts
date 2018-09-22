import DataManager from "@/protocol/data";
import Breeds from "@/protocol/data/classes/Breeds";
import { DataTypes } from "@/protocol/data/DataTypes";
import DTConstants from "@/protocol/DTConstants";
import Color from "@/utils/Color";
import { Enumerable, List } from "linqts";

export default class BreedsUtility {
  public static breeds: List<Breeds>;

  public static async Init() {
    const response = await DataManager.get<Breeds>(
      DataTypes.Breeds,
      ...Enumerable.Range(1, 15).ToArray()
    );
    this.breeds = new List(response.map(r => r.object));
  }

  public static getBreedHeads(breedId: number, sex: number): List<string> {
    return Enumerable.Range(1, 8).Select(
      o =>
        `${
          DTConstants.config.assetsUrl
        }/gfx/cosmetics/${breedId}${sex}_${o}.png`
    );
  }

  public static getCosmeticId(
    breedId: number,
    sex: boolean,
    headOrder: number
  ): number {
    return 1 + (breedId - 1) * 8 * 2 + (sex ? 1 : 0) * 8 + headOrder;
  }

  public static getIndexedColor(index: number, color: Color) {
    let result = 0;
    result |= (index & 0xf) << 24;
    result |= (color.r! & 0xff) << 16;
    result |= (color.g! & 0xff) << 8;
    result |= color.b! & 0xff;
    return result;
  }

  public static getBreedBaseColors(breed: Breeds, sex: number): Color[] {
    return (sex === 0
      ? new List(breed.maleColors).Select(this.parseIndexedColor)
      : new List(breed.femaleColors).Select(this.parseIndexedColor)
    ).ToArray();
  }

  private static parseIndexedColor(indexedColor: number) {
    // const index = (indexedColor & 0xf000000) >> 24;
    const red = (indexedColor & 0xff0000) >> 16;
    const green = (indexedColor & 0x00ff00) >> 8;
    const blue = indexedColor & 0x0000ff;
    return new Color(red, green, blue);
  }
}
