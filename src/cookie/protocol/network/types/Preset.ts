import PresetItem from "./PresetItem";
import Type from "./Type";

export default class Preset extends Type {
  public objects: PresetItem[];
  public presetId: number;
  public symbolId: number;
  public mount: boolean;
  constructor(presetId = 0, symbolId = 0, mount = false, objects: PresetItem[] = null) {
    super();
    this.objects = objects;
    this.presetId = presetId;
    this.symbolId = symbolId;
    this.mount = mount;
  }
}
